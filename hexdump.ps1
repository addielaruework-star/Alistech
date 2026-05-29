$navbarPath = "src\components\layout\Navbar.tsx"
$authPath = "src\lib\auth-context.tsx"

$lines = Get-Content $navbarPath -Encoding UTF8
foreach ($idx in @(72, 125)) {
    $line = $lines[$idx]
    Write-Output "Navbar Line $($idx+1): $line"
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($line)
    Write-Output ("Hex: " + ($bytes | ForEach-Object { '{0:X2}' -f $_ }) -join ' ')
    Write-Output ""
}

$lines2 = Get-Content $authPath -Encoding UTF8
foreach ($idx in @(21, 22)) {
    $line = $lines2[$idx]
    Write-Output "AuthContext Line $($idx+1): $line"
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($line)
    Write-Output ("Hex: " + ($bytes | ForEach-Object { '{0:X2}' -f $_ }) -join ' ')
    Write-Output ""
}
