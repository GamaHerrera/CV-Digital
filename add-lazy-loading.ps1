# Script para agregar loading="lazy" a las etiquetas img que no lo tengan
$files = Get-ChildItem -Path ".\pages\*.html" -Recurse

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Patrón para encontrar etiquetas img que no tengan loading="lazy"
    $pattern = '<img((?!loading=").)*?((?<!/)>|/>)'
    
    # Reemplazar solo si no tiene loading="lazy"
    $newContent = [regex]::Replace($content, $pattern, {
        $match = $_.Value
        if ($match -notlike '*loading="lazy"*') {
            $match -replace '/?>$', ' loading="lazy">'
        } else {
            $match
        }
    })
    
    # Escribir el archivo solo si hubo cambios
    if ($newContent -ne $content) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Host "Actualizado: $($file.Name)"
    } else {
        Write-Host "Sin cambios: $($file.Name)" -ForegroundColor Gray
    }
}

Write-Host "Proceso completado." -ForegroundColor Green
