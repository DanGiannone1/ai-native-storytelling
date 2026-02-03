param(
  [switch]$Legacy,
  [int]$Port = 3500,
  [string]$Path = ""
)

# If -Legacy flag, serve static files with Python for legacy HTML
if ($Legacy) {
  $legacyPort = if ($Port -eq 3500) { 8000 } else { $Port }
  $baseUrl = "http://localhost:$legacyPort"

  if (-not $Path) {
    $Path = "legacy/ai-foundations.html"
  }

  $fullUrl = "$baseUrl/$($Path.TrimStart('/'))"

  $py = Get-Command py -ErrorAction SilentlyContinue
  $python = Get-Command python -ErrorAction SilentlyContinue

  $cmd = if ($py) { $py.Source } elseif ($python) { $python.Source } else { $null }

  if ($cmd) {
    Write-Host "Serving legacy files at $baseUrl" -ForegroundColor Green
    Write-Host "Open $fullUrl" -ForegroundColor Cyan
    & $cmd -m http.server $legacyPort
    exit $LASTEXITCODE
  } else {
    Write-Error 'Python not found. Install Python or use another local server.'
    exit 1
  }
}

# Default: Run Vite dev server
Write-Host "Starting Vite dev server..." -ForegroundColor Green

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
  Write-Host "node_modules not found. Running npm install..." -ForegroundColor Yellow
  npm install
}

Write-Host "Open http://localhost:$Port" -ForegroundColor Cyan
npm run dev
