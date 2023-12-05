const validPassword = 'secret_user';

const validEmail = 'user@user.com';

const noPasswordLoginBody = { 
  email: validEmail, 
  password: '' 
};

const notExistingUserBody = { 
  email: 'notFound',
  password: validPassword 
};

const hashedPassword = '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO';

const existingUser = { 
    id: 2,
    username: 'User',
    role: 'user',
    email: 'user@user.com',
    password: hashedPassword
};

const validLoginBody = { 
  email: validEmail,
  password: validPassword 
};

const withoutEmailLoginBody = { 
    email: '',
    password: validPassword 
};
  

export default {
  noPasswordLoginBody,
  notExistingUserBody,
  existingUser,
  validLoginBody,
  withoutEmailLoginBody,
};
