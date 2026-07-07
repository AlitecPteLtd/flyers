# Project Summary

## Project Name

Attendance & Hardware Integration

## Industry / Business Type

Workforce-heavy businesses that need biometric attendance capture, shift-based daily in/out control, payroll-ready exports, and team or site timesheet management. The included timesheet module is positioned for construction and railway field teams, while the attendance stack is usable more broadly.

## Odoo Base Apps

- Employees
- Attendance
- Mail / Chatter

## Optional / Related Apps

- Payroll-related extensions
- Spreadsheet / Excel import-export support

## Main Custom Solution

This solution combines biometric attendance hardware integration with operational attendance processing and a complementary timesheet workflow. It pulls attendance data from ZKTeco devices, maps device codes to employees, converts raw logs into HR attendance and simple daily in/out records, calculates late minutes and day or night work patterns, supports manual corrections, and produces Excel outputs for staff and worker attendance handling. Separately, it also provides team-based timesheet import and approval for site operations.

This summary intentionally excludes the OCR and PDF timesheet processing modules.

## Key Customized Areas

- biometric device registration, state refresh, and command handling
- attendance log download and employee-code matching
- smart or punch-based attendance calculation
- late-minute calculation and no-checkout tolerance handling
- simple attendance daily table with device in/out details
- day-shift and night-shift hour splitting
- dated team-history assignment on attendance output
- staff and worker Excel attendance exports
- bulk Excel or CSV timesheet import with auto-created worker, team, and position records
- timesheet confirmation and approval workflow

## End-to-End Business Flow

1. connect biometric devices and maintain device timezone, area, and user data
2. pull or receive raw punch logs into Odoo
3. map device employee codes to Odoo employees
4. convert logs into HR attendance and simple daily in/out records
5. classify working time, missing check-out cases, and day or night shifts
6. assign team context using current team or dated team history
7. export payroll-ready attendance sheets for staff or workers
8. import site timesheets from Excel or CSV and move them through review and approval

## Main Business Benefits

- removes manual transcription from biometric terminals into spreadsheets
- gives HR one daily attendance table with device-level traceability
- supports payroll preparation with structured Excel outputs
- improves control over late arrivals, missing punches, and shift handling
- supports mobile or distributed site teams with team-based timesheet capture
- reduces setup friction by auto-creating worker, team, and position records during import
