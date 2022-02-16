# Online store

Online store built with Python Fastapi backend and React frontend.

## Setup

### Frontend

Node.js dependencies are in `package.json`. Install them with

    npm install

Start the frontend with

    npm run start

### Backend

Go to the `backend/app` folder. Create a virtual environment for development with

    python -m venv env

`env` is the name of the virtual environment and can be any of your liking. Initialize the virtual environment with `source ./env/bin/activate`. The virtual environment can be exited with the command `deactivate`.

Then install packages in `requirements.txt` with

    pip install -r requirements.txt

After that, the packages in the `poetry` installation file `pyproject.toml` can be install with

    poetry install

Then start the backend service with

    uvicorn app.main:app --reload

`--reload` reloads the backend whenever changes are made to any file.

SQLite is used as the database manager. The database is in the file `sql_app.db` in the backend folder.

To initialize the database, just start the backend server. The database population code is in `main.py`. Whenever the backend is restarted, the same initialization data is appended to the database contents. In order to reset the database, delete the `sql_app.db` file and restart the backend server.

[SQLiteBrowser](https://sqlitebrowser.org/) can be used to view the contents of the database file.

The backend uses [python-jose](https://github.com/mpdavis/python-jose) to create the jwt tokens.

## TODO
- API authentication is not working ( could check [this](https://fastapi.tiangolo.com/advanced/security/), [this](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/), [this](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/), [this](https://fastapi.tiangolo.com/tutorial/body/), [this](https://fastapi.tiangolo.com/advanced/security/http-basic-auth/), [this](https://stackoverflow.com/questions/64146591/custom-authentication-for-fastapi), [this](https://gist.github.com/nilsdebruin/8b36cd98c9949a1a87e3a582f70146f1), [this](https://dev.to/deta/get-started-with-fastapi-jwt-authentication-part-2-18ok), [this](https://fastapi.tiangolo.com/advanced/using-request-directly/), [this](https://www.starlette.io/requests/) )
- after API authentication is done, frontend authentication can be done with instruction in [this](https://www.robinwieruch.de/react-router-authentication/)
- smarter way of populating SQLite database
- maybe use in-memory sqlite database [like here](https://pythoninoffice.com/connect-and-work-with-sqlite-database-using-python-sqlite3/)
- dockerization
- frontend does not look any good -> styling

## Development notes
- [use cases of useEffect](https://dev.to/colocodes/6-use-cases-of-the-useeffect-reactjs-hook-282o)
- [prefill form](https://javascript.plainenglish.io/generating-api-driven-form-in-reactjs-d07ed54ca3f2)
- [fetch examples](https://jasonwatmore.com/post/2021/09/20/fetch-http-put-request-examples)
- [navigate with react router](https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router)
- [fastapi post request](https://stackoverflow.com/questions/59929028/python-fastapi-error-422-with-post-request)
- [checking that the jwt token is valid](https://stackoverflow.com/questions/50774780/always-getting-invalid-signature-in-jwt-io)

## Acknowledgements
- [initial front end code](https://github.com/basir/react-course-final)
- initial backend code, [this](https://github.com/tiangolo/full-stack-fastapi-postgresql) and [this](https://fastapi.tiangolo.com/project-generation/)