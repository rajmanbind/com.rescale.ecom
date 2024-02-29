import 'dart:convert';

import 'package:dalvi/constants/error_handling.dart';
import 'package:dalvi/constants/global_variable.dart';
import 'package:dalvi/constants/utils.dart';
import 'package:dalvi/features/home/screens/home_screens.dart';
import 'package:dalvi/models/user.dart';
import 'package:dalvi/providers/user_provider.dart';
import 'package:flutter/material.dart';
import "package:http/http.dart" as http;
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthService {
  //sign up user
  void signUpUser({
    required BuildContext context,
    required String email,
    required String password,
    required String name,
  }) async {
    late final currentContext = context;
    try {
      User user = User(
          id: '',
          name: name,
          password: password,
          email: email,
          address: '',
          type: '',
          // cart: [],
          token: '');

      http.Response res = await http.post(
        Uri.parse('$uri/api/signup'),
        body: user.toJson(),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );
      httpErrorHandling(
        response: res,
        context: currentContext,
        onSuccess: () {
          showSnackBar(currentContext,
              "Account created! Login with the same credentials");
        },
      );
      // print(res.body);
    } catch (e) {
      showSnackBar(currentContext, e.toString());
    }
  }

  //sign in user
  void signInUser({
    required BuildContext context,
    required String email,
    required String password,
  }) async {
    late final currentContext = context;
    try {
      http.Response res = await http.post(
        Uri.parse('$uri/api/signin'),
        body: jsonEncode({
          'email': email,
          'password': password,
        }),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );
      httpErrorHandling(
        response: res,
        context: currentContext,
        onSuccess: () async {
          SharedPreferences prefs = await SharedPreferences.getInstance();
          Provider.of<UserProvider>(context, listen: false).setUSer(res.body);
          await prefs.setString('x-auth-token', jsonDecode(res.body)["token"]);
          Navigator.pushNamedAndRemoveUntil(
              context, HomeScreen.routeName, (route) => false);

          // Navigator.pushNamedAndRemoveUntil(
          //   context,
          //   BottomBar.routeName,
          //   (route) => false,
          // );
        },
      );
    } catch (e) {
      showSnackBar(currentContext, e.toString());
    }
  }

  //get User Data
  void getUserData(
    BuildContext context,
  ) async {
    // late final currentContext = context;
    try {
      // http.Response res = await http.post(
      //   Uri.parse('$uri/api/signin'),
      //   body: jsonEncode({
      //     'email': email,
      //     'password': password,
      //   }),
      //   headers: <String, String>{
      //     'Content-Type': 'application/json; charset=UTF-8',
      //   },
      // );
      // httpErrorHandling(
      //   response: res,
      //   context: currentContext,
      //   onSuccess: () async {
      //     SharedPreferences prefs = await SharedPreferences.getInstance();
      //     Provider.of<UserProvider>(context, listen: false).setUSer(res.body);
      //     await prefs.setString('x-auth-token', jsonDecode(res.body)["token"]);
      //     Navigator.pushNamedAndRemoveUntil(
      //         context, HomeScreen.routeName, (route) => false);

      //   },
      // );
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }
}
