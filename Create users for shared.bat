@echo off
setlocal enabledelayedexpansion

:input_url
set /p URL=Enter Shared URL:

IF "%URL%"=="" (
    echo Please, enter Shared URL.
    goto input_url
)

:input_option
echo Choose an option:
echo 1. Create pupil
echo 2. Create tutor
echo 3. Create admin
echo 4. Create pupil and tutor
echo 5. Create pupil and admin
echo 6. Create tutor and admin
echo 7. Create all users

set /p OPTION=Enter the option number:

IF "%OPTION%"=="" (
    echo Please, enter an option number.
    goto input_option
)

rem Очистка файла перед выполнением тестов
echo. > consoleOutput.txt
echo. > usersInfo.txt

rem Запуск таймера
set start_time=%time%

rem Запуск Cypress тестов в зависимости от выбранной опции
if "%OPTION%"=="1" (
    start /wait "" cmd /c "npx cypress run --env URL=%URL% --spec ./cypress/e2e/create_pupil.cy.js > consoleOutput.txt"
) else if "%OPTION%"=="2" (
    start /wait "" cmd /c "npx cypress run --env URL=%URL% --spec ./cypress/e2e/create_tutor.cy.js > consoleOutput.txt"
) else if "%OPTION%"=="3" (
    start /wait "" cmd /c "npx cypress run --env URL=%URL% --spec ./cypress/e2e/create_admin.cy.js > consoleOutput.txt"
) else if "%OPTION%"=="4" (
    start /wait "" cmd /c "npx cypress run --env URL=%URL% --spec ./cypress/e2e/create_pupil.cy.js,./cypress/e2e/create_tutor.cy.js > consoleOutput.txt"
) else if "%OPTION%"=="5" (
    start /wait "" cmd /c "npx cypress run --env URL=%URL% --spec ./cypress/e2e/create_pupil.cy.js,./cypress/e2e/create_admin.cy.js > consoleOutput.txt"
) else if "%OPTION%"=="6" (
    start /wait "" cmd /c "npx cypress run --env URL=%URL% --spec ./cypress/e2e/create_tutor.cy.js,./cypress/e2e/create_admin.cy.js > consoleOutput.txt"
) else if "%OPTION%"=="7" (
    start /wait "" cmd /c "npx cypress run --env URL=%URL% --spec ./cypress/e2e/create_pupil.cy.js,./cypress/e2e/create_tutor.cy.js,./cypress/e2e/create_admin.cy.js > consoleOutput.txt"
) else (
    echo Invalid option number. Please try again.
    goto input_option
)

rem Рассчитываем время выполнения
set end_time=%time%
rem Удаляем лишние символы из времени окончания
set end_time=%end_time:~0,-3%

set "output_file=usersInfo.txt"

(for /f "delims=" %%a in ('findstr /R /C:"^[ ]*√" consoleOutput.txt') do (
  set "line=%%a"
  echo !line:√=!
)) > "%output_file%"

rem Вывод информации о сохранении файла и времени выполнения
echo.
echo Tests completed. Output saved to usersInfo.txt
echo Execution time: %start_time% - %end_time%

pause
endlocal


