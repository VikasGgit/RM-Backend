export const generateToken=(user, message, statusCode, res)=>{
    const token= user.generateJsonWebToken();
    const cookieName = user.role==="Admin" ? "adminToken": "maintainerToken";
    res
    .status(statusCode)
    .cookie(cookieName, token,{
        expires : new Date(
            Date.now()+ 7*24*60*60*1000
            ),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Ensure secure is false for local development
            sameSite: 'Lax' // Use 'Strict' or 'Lax' based on your needs

    })
    .json({
        success : true,
        message,
         cookieName, 
          user,
           token
    });
};