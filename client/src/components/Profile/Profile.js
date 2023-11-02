import React, { useEffect } from 'react'
import "./profile.css"
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { Navigate, useNavigate } from 'react-router-dom'
import {Box, Button, Heading, Image, Stack} from "@chakra-ui/react"

const Profile = () => {
    const navigate = useNavigate();
    const {user, loading, isAuthenticated} = useSelector((state) => state.user);
    // console.log(user);

    useEffect(() => {
        if(isAuthenticated === false){
            navigate('/login')
        }
    }, [navigate, isAuthenticated, user])

    return (
        <>
        {loading ? (<div className='loader'></div>):(
            <>
            <div className='main'>

                    <Box className='photo'>
                        <div>
                        <Heading fontSize={'1.2rem'}>My Profile</Heading>
                        </div>
                        <div className='ph'>
                        <Image 
                            src={user.avatar.url ? user.avatar.url : "./profile.png" }
                            borderRadius="100%"
                            >
                        </Image>
                        <Link to= "/profile/update">
                            <Button backgroundColor={'#635dc0'} marginTop={'1rem'} padding={'0.8rem'}>Edit Profile</Button>
                        </Link>
                        </div>
                    </Box>

                    <Box className='details'>
                        <div>
                            <Heading className='t1'>Name : </Heading>
                            <Heading className='t2'>{user.name}</Heading>
                        </div>
                        <div>
                            <Heading className='t1'>Email</Heading>
                            <Heading className='t2'>{user.email}</Heading>
                        </div>
                        
                        <div className='btn'>
                        <Link to= "/profile/update">
                            <Button backgroundColor={'#635dc0'} marginTop={'1rem'} padding={'0.8rem'}>My Orders</Button>
                        </Link>
                        </div>
                        <div className='btn'>
                        <Link to= "/profile/changepassword">
                            <Button backgroundColor={'#635dc0'} marginTop={'1rem'} padding={'0.8rem'}>Change Password</Button>
                        </Link>
                        </div>
                    </Box>
                    

                </div>
            </>
        )}
    </>
  )
}

export default Profile