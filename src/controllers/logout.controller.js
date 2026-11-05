export const logoutController = async (_req, res) => {
    const cookies = _req.cookies;

    if(!cookies?.accessToken){
        return res.sendStatus(401);
    }

    const accessToken = cookies.accessToken;
    res.clearCookie("accessToken",{
        secure: process.env.PAGE_URL === "production",
        httpOnly: true
    });

    return res.sendStatus(204);
};