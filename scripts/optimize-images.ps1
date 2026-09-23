Add-Type -AssemblyName System.Drawing

Write-Host "=== Step 1: Removing unused photo_*.jpg and Chinese duplicate images ==="

$publicDir = "src\public"
$benchmarksDir = "src\public\images\benchmarks"

# Delete unused photo_*.jpg
Get-ChildItem -Path $publicDir -Filter "photo_2026-*.jpg" | ForEach-Object {
    Write-Host "Deleting unused photo:" $_.Name
    Remove-Item $_.FullName -Force
}

# Delete Chinese duplicate images in benchmarks
Get-ChildItem -Path $benchmarksDir -Filter "*节点测速实测.png" | ForEach-Object {
    Write-Host "Deleting unused duplicate:" $_.Name
    Remove-Item $_.FullName -Force
}

Write-Host "=== Step 2: Optimizing and compressing used benchmark PNGs ==="

$pngFiles = Get-ChildItem -Path $benchmarksDir -Filter "*-speedtest.png"

foreach ($file in $pngFiles) {
    $fullPath = $file.FullName
    $oldSize = $file.Length

    # Open image without locking
    $bytes = [System.IO.File]::ReadAllBytes($fullPath)
    $ms = New-Object System.IO.MemoryStream(,$bytes)
    $orig = [System.Drawing.Image]::FromStream($ms)

    $targetWidth = 1080
    if ($orig.Width -lt $targetWidth) {
        $targetWidth = $orig.Width
    }
    $ratio = [double]$targetWidth / [double]$orig.Width
    $targetHeight = [int]($orig.Height * $ratio)

    $bmp = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $g.DrawImage($orig, 0, 0, $targetWidth, $targetHeight)

    $orig.Dispose()
    $ms.Dispose()
    $g.Dispose()

    # Save to memory stream as optimized PNG
    $outMs = New-Object System.IO.MemoryStream
    $bmp.Save($outMs, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()

    # If PNG is still over 350KB, save as high quality 85% JPEG format with PNG extension
    if ($outMs.Length -gt 350000) {
        $outMs.Dispose()
        $bmp2 = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
        $g2 = [System.Drawing.Graphics]::FromImage($bmp2)
        $g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        
        $ms2 = New-Object System.IO.MemoryStream(,$bytes)
        $orig2 = [System.Drawing.Image]::FromStream($ms2)
        $g2.DrawImage($orig2, 0, 0, $targetWidth, $targetHeight)
        $orig2.Dispose()
        $ms2.Dispose()
        $g2.Dispose()

        $outMs = New-Object System.IO.MemoryStream
        $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]85)
        $bmp2.Save($outMs, $jpegCodec, $encoderParams)
        $bmp2.Dispose()
        $encoderParams.Dispose()
    }

    $outBytes = $outMs.ToArray()
    $outMs.Dispose()

    [System.IO.File]::WriteAllBytes($fullPath, $outBytes)
    $newSize = (Get-Item $fullPath).Length
    $saving = [math]::Round((1.0 - ($newSize / $oldSize)) * 100, 1)
    Write-Host "$($file.Name): $($oldSize / 1KB | Out-String).Trim() KB -> $($newSize / 1KB | Out-String).Trim() KB (Saved $saving %)"
}

Write-Host "Image optimization completed successfully!"
