FROM python:3

RUN pip install --upgrade pip

COPY ./backend/requirements.txt .
RUN pip install -r requirements.txt

COPY ./backend /app/backend

WORKDIR /app/backend

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

COPY ./docker/django/entrypoint.sh /
ENTRYPOINT ["sh", "/entrypoint.sh"]


#FROM python:3
#
#ENV DockerHome=/home/app/webapp
#RUN mkdir -p ${DockerHome}
#WORKDIR $DockerHome
#
#ENV PYTHONUNBUFFERED 1
#ENV PYTHONDONTWRITEBYTECODE 1
#
#RUN pip install --upgrade pip
#COPY ../.. ${DockerHome}
#RUN pip install -r requirements.txt
#RUN python manage.py makemigrations --settings=TeamProject.settings.prod
#RUN python manage.py migrate --settings=TeamProject.settings.prod
#
#FROM python:3.8
#ENV PYTHONUNBUFFERED 1
#WORKDIR /app
#COPY requirements.txt /app/requirements.txt
#RUN pip install -r requirements.txt
#COPY . /app
