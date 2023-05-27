@echo off

setlocal

:input_url
set /p URL=Enter Shared URL:

IF "%URL%"=="" (
    echo Please, enter Shared URL.
    goto input_url
)

rem Очистка файла перед выполнением тестов
echo. > usersInfo.txt

rem Запуск таймера
set start_time=%time%

rem Запуск Cypress тестов и сохранение вывода в файл
start /wait "" cmd /c "npx cypress run --env URL=%URL% > usersInfo.txt"

rem Рассчитываем время выполнения
set end_time=%time%
rem Удаляем лишние символы из времени окончания
set end_time=%end_time:~0,-3%

rem Вывод информации о сохранении файла и времени выполнения
echo.
echo Tests completed. Output saved to usersInfo.txt
echo Execution time: %start_time% - %end_time%

pause

endlocal
