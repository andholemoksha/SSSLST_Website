# SSSLST Backend

This project is a Django backend for the SSSLST website. The following steps will help you set it up locally and run it whenever you need to work on the project.

## Initial setup

Open PowerShell in the backend folder and run:

```powershell
py -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
```

## How to run the backend

Every time you want to start the backend, run:

```powershell
cd C:\Users\AndholeMoksha\Desktop\SSSLST\backend
.\venv\Scripts\Activate.ps1
python manage.py runserver
```

Then open:

- http://127.0.0.1:8000/
- http://127.0.0.1:8000/admin/

## Useful commands

### Activate virtual environment

```powershell
.\venv\Scripts\Activate.ps1
```

### Install dependencies again

```powershell
pip install -r requirements.txt
```

### Apply migrations

```powershell
python manage.py migrate
```

### Create a superuser

```powershell
python manage.py createsuperuser
```

### Stop the server

Press Ctrl + C in the terminal where the server is running.
