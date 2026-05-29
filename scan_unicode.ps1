$files = Get-ChildItem -Path "src" -Recurse -Include "*.tsx","*.ts","*.js","*.jsx"
foreach ($file in $files) {
    $path = $file.FullName
    $lines = Get-Content $path -Encoding UTF8
    $ln = 0
    foreach ($line in $lines) {
        $ln++
        if ($line -match '[^\x00-\x7F]') {
            Write-Output "FILE: $path"
            Write-Output "  Line $ln : $line"
            Write-Output ""
        }
    }
}
