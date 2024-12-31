# The Minsky Lab
## Running the Project on a Local Machine
### Using Docker
Using Docker to run the project is recommended for testing, as this environment is closest to the one running on the VM.

To run the project on your local machine, please first install and configure Docker. 
You may want to change the resources that you have allocated to your Docker runner, and you can do this by going to the Docker Desktop app -> Settings -> Resources.
For reference the VM is using 2 cores and 4GB of RAM, but you can use the settings best suited for your machine.

To run the project:
1. Open Docker Desktop
2. Have a terminal open and be currently in the `team12-22` directory. 
3. Run the following command: `docker compose -f local-compose.yml up -d --build`.
4. Give it a second to run, this may take a while the first time or after some big changes. 
5. To stop the project, run `docker compose -f local-compose.yml down`.

[//]: # (To run the project on your local machine, first install a Python virtual environment. )

[//]: # (This can be done either:)

[//]: # (- VSCode: Show the command pallet by pressing Cmd+Shift+P &#40;Mac&#41; / Ctrl+Shift+P &#40;Windows&#41;, and then typing `Python: Create Enviroment` and selecting venv.)

[//]: # (- PyCharm: This can be done by going to the settings page for the project and then selecting the Python Interpreter menu, then choosing to create a new virtual environment.)

[//]: # ()
[//]: # (The virtual environment should now be setup.)

[//]: # ()
[//]: # (To run the webapp, once in the directory named 'team12-22' and currently in the virtual environment, follow these steps:)

[//]: # (1. Run `pip install -r requirements.txt`)

[//]: # (2. Run `python manage.py migrate --settings=TeamProject.settings.dev`)

[//]: # (3. Run `python manage.py runserver --settings=TeamProject.settings.dev`)

[//]: # (4. There should be no errors, so no go to: [http://127.0.0.1:8000/]&#40;http://127.0.0.1:8000/&#41;)

[//]: # (5. The website should now be visible in debug mode. )

[//]: # (6. To quit the server, press CONTROL-C. )

[//]: # ()
[//]: # (_Note: If you are using PyCharm, you can make this process easier by setting up a run configuration and changing the `DJANGO_SETTINGS_MODULE` option to `TeamProject.settings.dev` in the environment variables section._)

[//]: # (### Using Python Virtualenv and NPM Start)

[//]: # (This solution will allow for the code to be updated live, and can be built and run quicker than the Docker solution. However, this is a more complex process to setup.)

[//]: # ()
[//]: # (#### Steps to Perform *ONCE*)

[//]: # (1. Create a Python virtual environment in the folder *ABOVE* `team12-22`, i.e. your folder should look like:![img.png]&#40;img.png&#41;)

[//]: # (   1. Go to your terminal and be in the parent folder of `team12-22`.)

[//]: # (   2. Run the command `python3 -m venv ./venv`)

[//]: # (2. Activate the environment by running the command:)

[//]: # (   1. On Windows: `venv\Scripts\activate`)

[//]: # (   2. On macOS/Linux: `source venv/bin/activate`)

[//]: # (3. CD into `team12-22/backend`)

[//]: # (4. Run these commands: )

[//]: # (   1. `pip install -r requirements.txt`)

[//]: # (   2. `python manage.py makemigrations --settings=TeamProject.settings.dev`)

[//]: # (   3. `python manage.py migrate --settings=TeamProject.settings.dev`)

[//]: # (   4. `python manage.py runserver --settings=TeamProject.settings.dev`)

[//]: # (5. The backend will now be running. )

[//]: # (6. On another terminal, cd into `team12-22/frontend`.)

[//]: # (7. Run `npm install`.)

[//]: # (8. Run `npm start`. )

[//]: # (9. The server now should be running &#40;hopefully&#41;.)

## Contributors
- Hongli JI 
- Tariq Hawili
- Tsun Yip Cheung(Jason)
- Chenghao Huang
- Jack Smith
- Liyana Saleem
- Abirami Sundaramoorthy
