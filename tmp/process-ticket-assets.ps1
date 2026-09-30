Add-Type -AssemblyName System.Drawing

$sourcePath = Join-Path $PSScriptRoot "imagegen\journey-tickets-green.png"
$outputDir = Join-Path (Split-Path $PSScriptRoot -Parent) "app\frontend\src\assets"
$source = [System.Drawing.Bitmap]::new($sourcePath)
$thirdWidth = [int]($source.Width / 3)

for ($index = 0; $index -lt 3; $index++) {
    $segment = [System.Drawing.Bitmap]::new($thirdWidth, $source.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $graphics = [System.Drawing.Graphics]::FromImage($segment)
    $graphics.DrawImage(
        $source,
        [System.Drawing.Rectangle]::new(0, 0, $thirdWidth, $source.Height),
        [System.Drawing.Rectangle]::new($index * $thirdWidth, 0, $thirdWidth, $source.Height),
        [System.Drawing.GraphicsUnit]::Pixel
    )
    $graphics.Dispose()

    $minX = $segment.Width
    $minY = $segment.Height
    $maxX = -1
    $maxY = -1

    for ($y = 0; $y -lt $segment.Height; $y++) {
        for ($x = 0; $x -lt $segment.Width; $x++) {
            $pixel = $segment.GetPixel($x, $y)
            $dominance = $pixel.G - [Math]::Max($pixel.R, $pixel.B)
            $isGreen = $pixel.G -gt 105 -and $dominance -gt 24

            if ($isGreen) {
                $segment.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
                continue
            }

            if ($pixel.A -gt 0) {
                $minX = [Math]::Min($minX, $x)
                $minY = [Math]::Min($minY, $y)
                $maxX = [Math]::Max($maxX, $x)
                $maxY = [Math]::Max($maxY, $y)
            }
        }
    }

    $padding = 8
    $left = [Math]::Max(0, $minX - $padding)
    $top = [Math]::Max(0, $minY - $padding)
    $right = [Math]::Min($segment.Width - 1, $maxX + $padding)
    $bottom = [Math]::Min($segment.Height - 1, $maxY + $padding)
    $crop = [System.Drawing.Rectangle]::new($left, $top, $right - $left + 1, $bottom - $top + 1)
    $ticket = $segment.Clone($crop, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $outputPath = Join-Path $outputDir ("journey-step-ticket-{0}.png" -f ($index + 1))
    $ticket.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $ticket.Dispose()
    $segment.Dispose()
}

$source.Dispose()
