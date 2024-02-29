// import 'package:dalvi/constants/global_variable.dart';
import 'package:flutter/material.dart';

class CustomtextField extends StatelessWidget {
  final TextEditingController controller;
  final String hintText;
  const CustomtextField({
    Key? key,
    required this.controller,
    required this.hintText,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      decoration: InputDecoration(
        hintText: hintText,
        border: const OutlineInputBorder(
          borderSide: BorderSide(
            // color: GlobalVariables.secondaryColor,
            color: Colors.black38,
          ),
        ),
        enabledBorder: const OutlineInputBorder(
          borderSide: BorderSide(
            // color: GlobalVariables.secondaryColor,
            color: Colors.black38,
          ),
        ),
      ),
      validator: (val) {
        if (val == null || val.isEmpty) {
          return 'Enter You $hintText';
        }
        return null;
      },
    );
  }
}
