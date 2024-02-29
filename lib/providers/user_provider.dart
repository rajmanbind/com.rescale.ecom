import 'package:dalvi/models/user.dart';
import 'package:flutter/material.dart';

class UserProvider extends ChangeNotifier {
  User _user = User(
    id: '',
    name: '',
    email: '',
    password: '',
    address: '',
    type: '',
    token: '',
    // cart: [],
  );

  User get user => _user;

  void setUSer(String user) => {_user = User.fromJson(user), notifyListeners()};
  // void setUSerFromModle(String user) =>
  //     {_user = User.fromJson(user), notifyListeners()};
}
