# Task Scheduler

## Periodic Tasks

To run periodic tasks

- define a function ex. app/appcore/tasks/sample.py
- register the module in app/app/celery.py at app.autodiscover_tasks
- register the task in app/app/beat.py
- run worker `make run-worker`
- run scheduler `make run-beat`

## Environment variables handling

App supports standard `.env` file (docker-like, without `export` specification and quotes) via `python-dotenv`. So just copy .env.sample and fill with appropriate values and app will use it upon restart.
