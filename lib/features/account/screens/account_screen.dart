import 'package:dalvi/constants/global_variable.dart';
import 'package:dalvi/features/account/widgets/below_app_bar.dart';
import 'package:dalvi/features/account/widgets/orders.dart';
import 'package:dalvi/features/account/widgets/top_buttons.dart';
import 'package:flutter/material.dart';

class AccountScreen extends StatelessWidget {
  const AccountScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(50),
        child: AppBar(
          flexibleSpace: Container(
            decoration: const BoxDecoration(
              gradient: GlobalVariables.appBarGradient,
            ),
          ),
          title: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                alignment: Alignment.topLeft,
                child: ClipOval(
                  child: Image.asset(
                    'assets/images/dalviFarm.jpg',
                    height: 40,
                    width: 40,
                    fit: BoxFit
                        .cover, // Ensure the image fills the circular shape
                  ),
                ),
              ),
              Container(
                padding: const EdgeInsets.only(right: 15),
                // ignore: prefer_const_constructors
                child: Row(
                  children: const [
                    Padding(
                      padding: EdgeInsets.only(right: 15),
                      child: Icon(Icons.notifications_outlined),
                    ),
                    Icon(
                      Icons.search,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
      // ignore: prefer_const_constructors
      body: Column(
        children: const [
          BelowAppBar(),
          SizedBox(
            height: 10,
          ),
          TopButtons(),
          SizedBox(
            height: 10,
          ),
          Orders(),
        ],
      ),
    );
  }
}
