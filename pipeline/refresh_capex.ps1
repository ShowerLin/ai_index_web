param([string]$Workbook = "$PSScriptRoot\..\Indexlist.xlsx")
# Open the original workbook in the user's Excel session, retaining Bloomberg add-ins.
Start-Process -FilePath (Resolve-Path -LiteralPath $Workbook).Path
Write-Host 'Refresh Bloomberg in Excel, wait until all requests finish, then save the workbook.'
Read-Host 'Press Enter after saving to record the observation'
python "$PSScriptRoot\track_capex.py" --workbook $Workbook
if ($LASTEXITCODE -ne 0) { throw 'Capex collection failed' }
