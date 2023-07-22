import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import{BiMenuAltLeft} from 'react-icons/bi';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    VStack,
    HStack,
    Input
  } from '@chakra-ui/react';

const Header = () => {

    let navigate = useNavigate ("");

    const [keyword, setKeyword] = useState("");
    const {isOpen, onClose, onOpen} = useDisclosure();
    
    const searchHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`);
        }
        else{
            navigate(`/products`);
        }
    }

  return (
    <>
        <Button pos={"fixed"} top={'4'} left={'4'} colorScheme="purple" p={'0'} w = {'10'} h={'10'} borderRadius={'50'}
        onClick={onOpen} zIndex={'10'}>
            <BiMenuAltLeft size={'20'} />
        </Button>
        
        <Drawer isOpen = {isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerCloseButton/>
                <DrawerHeader>Shoppinger</DrawerHeader>

                <DrawerBody>
                    <VStack alignItems={'flex-start'}>
                        <HStack>
                            <Input type={'text'} placeholder='Type here...' 
                                onChange={(e)=>setKeyword(e.target.value)}
                            />
                            <Button type='submit' value = "Search" colorScheme='blue' onClick={searchHandler}>Search</Button>
                        </HStack>
                        
                        <Button onClick={onClose} variant={'ghost'} colorScheme={'purple'}>
                            <Link to={'/'}>Home</Link>
                        </Button>
                        <Button onClick={onClose} variant={'ghost'} colorScheme={'purple'}>
                            <Link to={'/products'}>Product</Link>
                        </Button>
                        <Button onClick={onClose} variant={'ghost'} colorScheme={'purple'}>
                            <Link to={'/contact'}>Contact</Link>
                        </Button>
                        <Button onClick={onClose} variant={'ghost'} colorScheme={'purple'}>
                            <Link to={'/about'}>About</Link>
                        </Button>
                    </VStack>

                    <HStack pos={'absolute'} bottom={'10'} left={'0'} justifyContent={'space-evenly'} w = {'full'}>
                        <Button onClick={onClose} colorScheme={'purple'}>
                            <Link to={'/login'}>My Profile</Link>
                        </Button>

                        <Button onClick={onClose} colorScheme={'purple'} variant={'outline'}>
                            <Link to={'/cart'}>Cart</Link>
                        </Button>
                    </HStack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>
  )
}

export default Header