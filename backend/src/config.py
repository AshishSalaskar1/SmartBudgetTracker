from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    azure_ai_endpoint: str
    azure_ai_api_key: str
    azure_ai_deployment: str
    db_path: str
    app_admin_username: str
    app_admin_password: str
    app_user_username: str
    app_user_password: str
    session_secret: str

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
