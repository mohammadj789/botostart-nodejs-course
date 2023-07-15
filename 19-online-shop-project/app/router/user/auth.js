const { Router } = require("express");
const {
  UserAuthController,
} = require("../../connection/controller/user/auth/auth.controller");

const router = Router();
/**
 * @swagger
 * tags:
 *  name: User-Authentication
 *  description: user auth section
 */

/**
 * @swagger

 * /user/get-otp:
 *  post:
 *    summary: Authenticate user
 *    description: Authenticate user using phone and if its not registered makes an account using OTP
 *    tags: [User-Authentication]
 *    parameters:
 *    - name: mobile
 *      description: fa-IRI phone number
 *      in: formData
 *      required: trus
 *      type: string
 *    responses:
 *      200:
 *        description: Success login
 *      400:
 *        description: bad request
 *      401:
 *        description: unauthorized
 *      500:
 *        description: InteranServerError
 *
 */
router.post("/get-otp", UserAuthController.getOtp);
/**
 * @swagger

 * /user/check-otp:
 *  post:
 *    summary: check otp value in user controller
 *    description: check if ot p code matches with mobile and is valid or nat
 *    tags: [User-Authentication]
 *    parameters:
 *    - name: mobile
 *      description: fa-IRI phone number
 *      in: formData
 *      required: true 
 *      type: string
 *    - name: code
 *      description: otp code recived throgh sms 
 *      in: formData
 *      required: true 
 *      type: string
 *    responses:
 *      200:
 *        description: Success login
 *      404:
 *        description: not found
 *      401:
 *        description: unauthorized
 *      500:
 *        description: InteranServerError
 *
 */
router.post("/check-otp", UserAuthController.checkOtp);
module.exports = { UserAuthRoutes: router };
