const { prismaClient } = require('../configs/database/prismaClient')

const getAccountDetails = async (req, res) => {
  try {
    const accountDetails = await prismaClient.account.findFirst({
      where: {
        userid: req.params.userId,
      },
    })

    if (!accountDetails) {
      return res.status(404).json({ message: 'No user account details found.' })
    }

    return res
      .status(200)
      .json({ userId: req.params.userId, details: accountDetails })
  } catch (err) {
    console.log(err, 'Error')
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const addAccountDetails = async (req, res) => {
  console.log( ' addAccountDetailsBody' , req.body)
  try {
    const {
      subscription,
      name,
      address,
      companyname,
      email,
      paymentmethod,
      settings,
      userid,
      accCode,
    } = req.body

    const accountDetails = await prismaClient.account.create({
      data: {
        subscription,
        address,
        companyname,
        dateregister: new Date(),
        email,
        paymentmethod,
        name,
        settings: settings || {},
        userid,
        accCode,
      },
    })

    return res
      .status(200)
      .json({ userId: req.params.userId, details: accountDetails, message: `Account details added.` })
  } catch (err) {
    console.log(err, 'Error')
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const editAccountDetails = async (req, res) => {
  console.log( ' editAccountDetails' , req.body)

  try {
    const {
      subscription,
      name,
      address,
      companyname,
      email,
      paymentmethod,
      settings,
    } = req.body

    console.log(req.body, 'Body');

    const accountDetails = await prismaClient.account.update({
      where: { userid: req.params.userId }, data: {
        subscription,
        address,
        companyname,
        dateregister: new Date(),
        email,
        paymentmethod,
        name,
        settings: settings || {},
      },
    }
    )

    if (!accountDetails) {
      return res.status(404).json({ message: 'No user account details found.' })
    }

    return res
      .status(200)
      .json({ userId: req.params.userId, updatedDetails: accountDetails })
  } catch (err) {
    console.log(err, 'Error')
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const getAccountSettings = async (req, res) => {
  try {
    const accountDetails = await prismaClient.account.findFirst({
      where: {
        userid: req.params.userId,
      },
    })

    if (!accountDetails) {
      return res.status(404).json({ message: 'No user account details found.' })
    }

    return res
      .status(200)
      .json({ userId: req.params.userId, settings: accountDetails.settings })
  } catch (err) {
    console.log(err, 'Error')
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const editAccountSettings = async (req, res) => {
  try {
    const {
      settings,
    } = req.body

    const accountDetails = await prismaClient.account.update({
      where: { userid: req.params.userId }, data: {
        settings: settings || {},
      },
    }
    )

    if (!accountDetails) {
      return res.status(404).json({ message: 'No user account settings found.' })
    }

    return res
      .status(200)
      .json({ userId: req.params.userId, updatedSettings: accountDetails.settings })
  } catch (err) {
    console.log(err, 'Error')
    return res.status(500).json({ message: 'Internal server error' })
  }
}
const deleteAccountDetails = async (req, res) => {
  try {
    const accountDetails = await prismaClient.account.delete({
      where: {
        id: parseInt(req.params.id),
      },
    })

    if (!accountDetails) {
      return res.status(404).json({ message: 'No user account details found.' })
    }

    return res
      .status(200)
      .json({ userId: req.params.userId, message: `Account details deleted.` })
  } catch (err) {
    console.log(err, 'Error')
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const updateAccountSubscription = async (req, res) => {
  try {
    const accountDetails = await prismaClient.account.update({
      where: {
        userid: req.params.id,
      },
      data: {
        subscription: req.body.subscription,
      },
    })

    if (!accountDetails) {
      return res.status(404).json({ message: 'No user account details found.' })
    }

    return res
      .status(200)
      .json({ message: `Account subscription updated.` })
  } catch (err) {
    console.log(err, 'Error')
    return res.status(500).json({ message: 'Internal server error' })
  }

}


module.exports = {
  getAccountDetails,
  addAccountDetails,
  editAccountDetails,
  editAccountSettings,
  getAccountSettings,
  deleteAccountDetails,
  updateAccountSubscription
}