import React, { useState } from 'react';


const Login = () => {

    const [csrfToken, setcsrfToken] = useState('')
    const [username, setUsername] = useState('')

    React.useEffect(() => {
        fetch("http://localhost:8000/account/csrf/", {
            credentials: "include"
        })
            .then((res) => {
                let csrfToken = res.headers.get("X-CSRFToken")
                setcsrfToken(csrfToken);
                console.log(csrfToken)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color "primary"}
                        label="Remember me"
                        />
                        <Button
                            type="sumbit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid containe>
                            <Grid>
                                <Link href="#" variant="body2">
                                    Forgot password?
                            </Grid>
                        </Link>

                    </Grid>
                </form>
            </div>
        </Container>
        </>
    );
}

export default Login;