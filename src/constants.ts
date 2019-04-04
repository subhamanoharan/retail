export default {
  ERRORS: {
    BARCODE_EXISTS: (item) => `An item with barcode "${item.barcode}" already exists.
    Please try another barcode or edit the existing item`,
    INVALID_PRICE: 'Please enter a valid number for price',
    INVALID_BARCODE: 'Please enter a valid barcode',
    INVALID_NAME: 'Please enter a valid name with a maximum of 255 characters'
  },
  USER_ROUTE_ERRORS:{
    MISSING_AUTH: 'Missing Authorization Header',
    INVALID_AUTH_ERROR: 'Invalid Authentication Credentials',
    UNAUTHORISED: 'You need to login to continue!',
    USER_NOT_FOUND: 'This user does not exist!'
  },
  NAME_MAX_LENGTH: 255,
  OPEN_ROUTES: ["/api/users/authenticate"],
  ROLES: {
    USER: 'user',
    ADMIN: 'admin'
  }
}
