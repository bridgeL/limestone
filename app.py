from pathlib import Path
from fastapi import FastAPI
from starlette.responses import FileResponse, RedirectResponse
from colorama import Fore

app = FastAPI()


def eprint(name: str, text: str):
    print(Fore.YELLOW + name + Fore.RESET + f" {text} {'-'*10}")


@app.get("/")
def test():
    return RedirectResponse("limestone/")


@app.get("/limestone/")
def test():
    return FileResponse("index.html")


@app.get("/limestone")
def test():
    return RedirectResponse("limestone/")


@app.get("/limestone/{file:path}/")
def test(file):
    return FileResponse(file + "/index.html")


@app.get("/limestone/{file:path}")
def test(file: str):
    # 请求网站，重定向
    if file.rfind(".") == -1:
        # 再次确认是否是请求子网站网页
        if Path(file+".html").exists():
            return FileResponse(file + ".html")

        file = file.rsplit("/")[-1]
        return RedirectResponse(file + "/")

    # 请求文件,发送
    return FileResponse(file)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("__main__:app", port=20227, reload=True)

if __name__ == "__mp_main__":
    import webbrowser
    webbrowser.open("http://127.0.0.1:20227")
