import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'yaari-shipping-return-policy',
  templateUrl: './shipping-return-policy.component.html',
  styleUrls: ['./shipping-return-policy.component.scss']
})
export class ShippingReturnPolicyComponent implements OnInit {
  public shippingpolicies: object = [{}];
  public returnpolicies: object = [{}];
  constructor() { }

  ngOnInit(): void {
    this.buildShippingPolicyJson();
    this.buildReturnPolicyJson();
  }
  buildShippingPolicyJson(){
    this.shippingpolicies = [
      {
        id: 'heading',
        'shippingpolicy_name': 'What is the cost of shipping?',
        'shippingpolicy': "For all orders above Rs. 499, shipping is done free of cost. A shipping charge of Rs. 100 is applicable to all orders under Rs. 499."
      },
      {
        id: 'heading',
        'shippingpolicy_name': 'How long will it take for the order to reach me?',
        'shippingpolicy': "Please refer the product page for estimated shipping and delivery timelines for orders. From the time of order placed, it takes about 5-7 days for orders to reach you.If you have placed an order with multiple items, please note that your items may arrive in multiple shipments. The estimated delivery times are indicative, and, on some occasions, there might be some unavoidable delays beyond our control. We will keep you informed in case of any delays."
      },
      {
        id: 'heading',
        'shippingpolicy_name': 'What if my order dispatch is delayed?',
        'shippingpolicy': "We will try our best to get your products to you within the estimated delivery times. If the package has not reached you by the expected delivery date, please write to us at help.HPB@ydiconsumer.com and we will try our best to resolve your issues."
      },
      {
        id: 'heading',
        'shippingpolicy_name': 'My order has been shipped. Can I track it?',
        'shippingpolicy': "Once your order has been dispatched, you can track the order from My Order section.You can track the status of your package 24 hours after your order is dispatched from our warehouse or vendor location"
      },
    ]
  }
  buildReturnPolicyJson(){
    this.returnpolicies = [
      {
        id: 'heading',
        'returnpolicy_name': 'What is the return policy on Nykaa Fashion?',
        'returnpolicy': "Most of our products are eligible for return and replacements. There are some items that are not eligible for returns. The return and exchange policy for every product is clearly mentioned on the product page.If the product is eligible for return/ replacement, you can raise the return/ replacement request from My Order section in App within 7 days of delivery to request return and replacement. Please make sure that the products are unused, unworn, unwashed, undamaged, with all its labels and tags completely intact, in original packaging and eligible for return only can be returned/ replaced."
      },
      {
        id: 'heading',
        'returnpolicy_name': 'How are returns processed?',
        'returnpolicy': "Once you request to return a product, a pick up is organised for the item. Our courier partners will come to pick up the item within 3-5 business days after your return request has been received. Once pickup is done, your refund will be initiated from our end which can take up to 7-10 days to be visible in your account."
      },
      {
        id: 'heading',
        'returnpolicy_name': 'Can I cancel my order?',
        'returnpolicy': "You can cancel your order within 24 hours of order through My Order section or by writing to us at help.HPB@ydiconsumer.com**Half Price Bazaar reserves the right to cancel any order without pre-confirming the customer at any time and may verify any order before shipping the same to the customer that may include having a verbal or written confirmation from the customer."
      },
      {
        id: 'heading',
        'returnpolicy_name': 'How will I receive the refund for my cancelled or returned product?',
        'returnpolicy': "In case of prepaid orders, money will be returned to the bank account/ credit/debit card where the payment was made from. For Cash on Delivery orders customers will be required to provide bank details/UPI ID where they would like to receive the refund."
      },
      {
        id: 'heading',
        'returnpolicy_name': 'How long does it take to receive a refund for a cancelled or returned product?',
        'returnpolicy': "We will process your refund within 3 business days in case of cancellation of an order. In case of returns, we will refund the money after the product has been picked up by our courier partner."
      },
      {
        id: 'heading',
        'returnpolicy_name': 'Can I return part of my order?',
        'returnpolicy': "Yes. You can return any products that are eligible for returns within 7 days of delivery. Please do note there are some items that are not eligible for return or refund.(Policy is mentioned on the product page for return or exchange)"
      },
      {
        id: 'heading',
        'returnpolicy_name': 'My garment does not fit me. What can I do?',
        'returnpolicy': "If the product does not fit and you would like a new size, please request for a size exchange through My order section or the customer service team within 7 days of receiving the product. Our team will try its best to help you for any size exchanges, subject to availability. In case the size you have requested is not available we will offer you the option to return the product instead."
      },
    ]
  }
}

  


