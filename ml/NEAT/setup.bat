set mypy=%cd%\venv\Scripts\python.exe

@echo off
py -m venv ./venv
%mypy% -m pip install --upgrade pip

call .\venv\Scripts\activate.bat
%mypy% install -r requirements.txt
call .\venv\Scripts\deactivate.bat

