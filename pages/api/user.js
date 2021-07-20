import withSession from '@/lib/withSession'

// endpoint for reading the user's session cookie and retrieving user data from it/database
export default withSession(async (req, res) => {
  const user = req.session.get('user')

  if (user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      isLoggedIn: true,
      ...user,
    })
  } else {
    res.json({
      isLoggedIn: false,
    })
  }
})
