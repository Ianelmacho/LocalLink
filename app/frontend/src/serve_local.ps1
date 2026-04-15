$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$prefix = "http://localhost:9000/"

$mimeTypes = @{
  ".css"  = "text/css"
  ".gif"  = "image/gif"
  ".htm"  = "text/html"
  ".html" = "text/html"
  ".jpeg" = "image/jpeg"
  ".jpg"  = "image/jpeg"
  ".js"   = "application/javascript"
  ".json" = "application/json"
  ".png"  = "image/png"
  ".svg"  = "image/svg+xml"
  ".txt"  = "text/plain"
  ".webp" = "image/webp"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()

Write-Host "Serving $root at $prefix"

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $requestPath = [System.Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart("/"))

    if ([string]::IsNullOrWhiteSpace($requestPath)) {
      $requestPath = "index.html"
    }

    $localPath = Join-Path $root $requestPath

    if ((Test-Path $localPath) -and (Get-Item $localPath).PSIsContainer) {
      $localPath = Join-Path $localPath "index.html"
    }

    if (-not (Test-Path $localPath)) {
      $context.Response.StatusCode = 404
      $buffer = [System.Text.Encoding]::UTF8.GetBytes("Not found")
      $context.Response.OutputStream.Write($buffer, 0, $buffer.Length)
      $context.Response.Close()
      continue
    }

    $extension = [System.IO.Path]::GetExtension($localPath).ToLowerInvariant()
    $contentType = $mimeTypes[$extension]
    if (-not $contentType) {
      $contentType = "application/octet-stream"
    }

    $bytes = [System.IO.File]::ReadAllBytes($localPath)
    $context.Response.ContentType = $contentType
    $context.Response.ContentLength64 = $bytes.Length
    $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    $context.Response.Close()
  }
}
finally {
  $listener.Stop()
  $listener.Close()
}
