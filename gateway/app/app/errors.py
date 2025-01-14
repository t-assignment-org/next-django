from pydantic import BaseModel


class HttpError(BaseModel):
    status_code: int
    message: str | None = None
    data: dict | None = None


def make_error(
    status_code: int, message: str, data: dict | None = None
) -> tuple[int, HttpError]:
    return status_code, HttpError(status_code=status_code, message=message, data=data)
