import "package:dalvi/constants/global_variables.dart";
import "package:dalvi/features/account/widgets/single_product.dart";
import "package:flutter/material.dart";

class Orders extends StatefulWidget {
  const Orders({super.key});

  @override
  State<Orders> createState() => _OrdersState();
}

class _OrdersState extends State<Orders> {
  //temporary list
  //

  List list = [
    {
      'image':
          'https://images.unsplash.com/photo-1551649001-9c071b61f26c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1hbmdvfGVufDB8fDB8fHww',
      'product': 'Mango1',
    },
    {
      'image':
          'https://images.unsplash.com/photo-1519096845289-95806ee03a1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1hbmdvfGVufDB8fDB8fHww',
      'product': 'Mango2',
    },
    {
      'image':
          'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuZ298ZW58MHx8MHx8fDA%3D',
      'product': 'Mango3',
    },
    {
      'image':
          'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFuZ298ZW58MHx8MHx8fDA%3D',
      'product': 'Mango4',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Container(
              padding: const EdgeInsets.only(
                left: 15,
              ),
              child: const Text(
                "Your Orders",
                style: TextStyle(
                  fontSize: 18,
                  // color: Colors.black,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.only(
                right: 15,
              ),
              child: Text(
                "See all",
                style: TextStyle(
                  color: GlobalVariables.selectedNavBarColor,
                ),
              ),
            ),
          ],
        ),
        // display orders
        Container(
          height: 170,
          padding: const EdgeInsets.only(
            left: 10,
            top: 20,
            right: 0,
          ),
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: 3,
            itemBuilder: ((context, index) {
              return SingleProduct(image: list[index]['image']);
            }),
          ),
        ),
      ],
    );
  }
}
