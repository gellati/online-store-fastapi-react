import { SubmitHandler, useForm } from "react-hook-form";
import { json } from "stream/consumers";
import HomeButton from "../components/HomeButton";
import { saveToken } from '../utils/localStorage'

type Inputs = {
    username: string,
    password: string,
  };

  function LoginPage():JSX.Element {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

    const onSubmit:SubmitHandler<Inputs> = async (data:Inputs) => {
      console.log({data});

      let urlencoded = new URLSearchParams()
      urlencoded.append('username', data.username)
      urlencoded.append('password', data.password)
      urlencoded.append('grant-type', 'password')

      const response = await fetch('http://127.0.0.1:8000/api/v1/login/access-token/', {
        method: 'POST',
        body: urlencoded,

        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },

        mode: 'cors',
        redirect: 'follow',
      })

      if(response.ok) {
        const jsonValue = await response.json()
        console.log({jsonValue})
        if(jsonValue.access_token) {
          saveToken(jsonValue.access_token)
        }
      }

      /*
      .then(response => {
        if(response.ok) {
          const jsonValue = await response.json()
          console.log({jsonValue})

        }
        console.log({response})
        console.log(response.headers)
        console.log(response.json)
        console.log(response.body)

        if(response) {
          console.log(response.headers)
        }

      })
      */
    }


    console.log(watch("username"))
    console.log(watch("password"))

    return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
<div>

      <HomeButton />

      <form onSubmit={handleSubmit(onSubmit)}>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              margin: '0 auto',
              width: '50%',
            }}
          >
          <input type={'text'} {...register("username")} />
          {errors.username && <span>This field is required</span>}

          <input type={'password'} {...register("password", { required: true })} />
          {errors.password && <span>This field is required</span>}
          <input type="submit" value={'Login'}/>
          </div>
      </form>

      </div>
    );
  }
export default LoginPage
