import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'yaari-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  public policies: object = [{}];
  constructor() { }

  ngOnInit(): void {
    this.buildPolicyJson();
  }

  buildPolicyJson() {
    this.policies = [
      {
        'id': 'heading',
        'policy_name': 'GENERAL',
        'policy': 'For the purpose of this privacy policy, “we”, “us” and “our” means YDI CONSUMER LIMITED (“Company”) and “you”, “your” and “user” means any person who accesses or uses the services provided by our website available at [•] (“Half Price Bazar”) or any online/mobile application that refers to or links to this Privacy Policy.'
      },
      {
        'id': 'heading',
        'policy_name': 'PERSONAL INFORMATION',
        'policy': "In the course of registering for and availing various services we provide from time to time through Half Price Bazar(“Services”) you may be required to give certain details, including your name, address, contact number, email address (“Personal Information”). By using the Half Price Bazar website or registering yourself, you authorize us to contact you via email or phone call or SMS and offer you Services you have opted for, imparting knowledge about products listed on our application, as well as for web aggregation. Additionally, by registration, you authorize us to send SMS/email alerts to you for your login details and any other service requirements or advertising messages/emails.This Privacy Policy applies regardless of whether you use a computer, mobile phone, tablet, or television or any other media or computer resource to access our Services. It is important that you read the Privacy Policy carefully because anytime you use our Services you consent to the practices/ policies that we have set out in this Privacy Policy.You acknowledge that you are disclosing Personal Information voluntarily. Prior to the completion of any registration process on Half Price Bazar / or prior to availing of any Services offered on our website if you wish not to disclose any Personal Information you may refrain from doing so; however if you don’t provide information that is requested, it is possible that the registration process would be incomplete and/or you may not be able to avail certain of our Services."
      },
      {
        id: 'heading',
        'policy_name': 'COLLECTION OF YOUR INFORMATION',
        'policy': "When you use Half Price Bazar, we collect and store your information which is provided by you from time to time. We may track your buying behaviour, preferences, and other information that you choose to provide on Half Price Bazar. We use this information to do internal research on our users' demographics, interests, and behaviour to better understand, protect and serve our users. This information is compiled and analysed on an aggregated basis. This information may include the URL that you just came from (whether this URL is on Half Price Bazar or not), which URL you next go to (whether this URL is on our Half Price Bazar or not), your computer browser information, and your IP address.We collect personal information(such as email address, delivery address, name, phone number, credit card/ debit card and other payment instrument details) from you when you set up an account or transact with us.While you can browse some sections of Half Price Bazar without being a registered member, certain activities(such as placing an order or consuming our online content or services) do require registration.We do use your contact information to send you offers based on your previous orders and your interests.If you choose to post messages on our message boards, chat rooms or other message areas or leave feedback or if you use voice commands to shop on Half Price Bazar, we will collect that information you provide to us.We retain this information as necessary to resolve disputes, provide customer support and troubleshoot problems as permitted by law.If you send us personal correspondence, such as emails or letters, or if other users or third parties send us correspondence about your activities or postings on Half Price Bazar, we may collect such information into a file specific to you."
      },
      {
        id: 'heading',
        'policy_name': 'USE OF PERSONAL INFORMATION',
        'policy': "We are committed to protecting the privacy and confidentiality of all Personal Information that you may share as a user of our website. In furtherance of the confidentiality with which we treat Personal Information we have put in place appropriate physical, electronic, and managerial procedures to safeguard and secure the information we collect from you. To protect your privacy and security, we will also take reasonable steps to verify your identity before granting access or making corrections. We may use third-party advertising companies and/or ad agencies to serve advertisement when you visit our application. These companies may use information (excluding Personal Information) about your visits to the website and other Web sites in order to provide advertisements on the application and other sites about goods and services that may be of interest to you. There might be affiliates or other sites linked to our application and information that you provide to those sites are not our property. The affiliated sites may have different privacy practices and we encourage you to read them.We use your personal information to assist sellers and business partners in handling and fulfilling orders; enhancing customer experience; resolve disputes; troubleshoot problems; help promote a safe service; collect money; measure consumer interest in our products and services; inform you about online and offline offers, products, services, and updates; customize and enhance your experience; detect and protect us against error, fraud and other criminal activity; enforce our terms and conditions; and as otherwise described to you at the time of collection of information.We may also request you to provide your PAN, GST Number, Government issued ID cards/number and Know-Your-Customer (KYC) details to: (i) check your eligibility for certain products and services including but not limited to credit and payment products; (ii) issue GST invoice for the products and services purchased for your business requirements; (iii) enhance your experience on Half Price Bazar and provide you access to the products and services being offered by us, sellers, affiliates or lending partners. You understand that your access to these products/services may be affected in the event consent is not provided to us.In our efforts to continually improve our product and service offerings, we and our affiliates collect and analyse demographic and profile data about our users' activity on Half Price Bazar. We identify and use your IP address to help diagnose problems with our server, and to administer Half Price Bazar. Your IP address is also used to help identify you and to gather broad demographic information."
      },
      {
        id: 'heading',
        'policy_name': 'COOKIES',
        'policy': "When you use Half Price Bazar, we collect certain non-personal identifiable information through technology and tools, including cookies, etc. A “cookie” is a small piece of information stored by a web server on a web browser so it can be later read back from that browser. The Company uses cookie and tracking technology depending on the features offered. We aggregate and analyse this information in order to learn more about how our website is used, to improve Half Price Bazar, and to generally promote the Half Price Bazar and our Services. We may engage the services of a third party for the purposes of collection of such information."
      },
      {
        id: 'heading',
        'policy_name': 'DISCLOSURES',
        'policy': "We will not sell or rent Personal Information to anyone other than as specifically noted. We will share Personal Information if we have your consent or deemed consent to do so or if we are compelled by law (including court orders) to do so or as specified in the Terms. Notwithstanding anything mentioned above, we reserve the right to contact you via any mechanisms, not limited to email, SMS, or phone calls, to solicit feedback of your experience and to provide any additional services that you would be eligible for, either as a registered user or as a visitor. We are not liable for any damages occurring to you as part of feedback solicitation and additional service provision.The Personal Information is being collected by the Company with its address at 612-613, Tower-1, One International Centre, Senapati Bapat Marg, Elphinston Mill compound, Mumbai City, Maharashtra, 400013 and the Company will delete any Personal Information upon the User withdrawing the consent in writing, however, upon the withdrawal of the consent by the User, the Company may at its option not provide any services for which the Information was sought and the User shall not claim deficiency of services on the basis of such non provision of goods and services."
      },
      {
        id: 'heading',
        'policy_name': 'CHANGE TO PRIVACY POLICY',
        'policy': "We reserve the right to amend this Privacy Policy or any other of our policies/practices at any time without giving any prior notification from time to time, at our discretion. Any updates will be posted on / and your use of Half Price Bazar/ after such amendment shall constitute your agreement to abide by the amended terms. Hence, you are requested to review the Privacy Policy periodically, to make sure that you are aware of any such changes."
      },
      {
        id: 'heading',
        'policy_name': 'CONSENT TO INTERNATIONAL TRANSFER OF DATA',
        'policy': "By using or participating in any Service and/or providing us with your information, you consent to the collection, transfer, storage and processing of your information outside India, consistent with this Privacy Policy. Please note that the data protection laws of countries to which your information may be transferred shall be at same level as that of India."
      },
      {
        id: 'heading',
        'policy_name': 'DATA RETENTION',
        'policy': "We take reasonable steps to ensure that information about you is available only for so long as is necessary for the purpose for which it is processed, or longer if required under any contract, by applicable law, or for statistical purposes, subject to appropriate safeguards."
      },
      {
        id: 'heading',
        'policy_name': 'THIRD-PARTY LINKS AND CONTENT ON OUR SERVICES',
        'policy': "Our Services may link to third-party websites and services that are outside our control. Further, the Company, its group companies, its affiliates, and their directors and employees (“YDI Group”) accept no liability and will not be liable for any loss or damage arising directly or indirectly (including special, incidental or consequential, punitive, or exemplary loss, damage or expenses) from your use of any mobile application or any site or inability to use by any party, howsoever arising, and including any loss, damage or expense arising from, but not limited to, any defect, error, omission, interruption, imperfection, fault, mistake or inaccuracy with the website, its Contents (material, information, data, money market movements, news items, etc.) or associated services, or due to unavailability of any application or any part thereof or any Contents or associated services even if YDI Group are advised of the possibility of such damages, losses or expenses."
      },
      {
        id: 'heading',
        'policy_name': 'INTELLECTUAL PROPERTY RIGHTS',
        'policy': "Please note that Half Price Bazar retains all rights (including copyrights, trademarks, patents as well as any other intellectual property right) in relation to all information provided on or via this web site (including all texts, graphics and logos)."
      },
      {
        id: 'heading',
        'policy_name': 'CONSENT',
        'policy': "You consent to the collection and use of the information you disclose to Half Price Bazar in accordance with this Privacy Policy, including but not limited to your consent for sharing your information as per this Privacy Policy."
      },
      {
        id: 'heading',
        'policy_name': 'DISCLAIMER',
        'policy': "Kindly note that Half Price Bazar does not collect any personal information about individuals except this information is specifically provided by such individuals on voluntary basis. Upon such voluntary disclosure of personal information, we may further verify, collate or receive information about you from publicly and commercially available sources (as permitted by law), which we may combine with other information we receive from you. We may also receive information about you from third-party social networking services if you are already connected with those services. Half Price Bazar shall, at all times, ensure to implement reasonable security practices and procedures (such as managerial, operational, physical and technical) for the purpose of protection and safeguarding of your personal data and information as the same is of vital importance to Half Price Bazar. At Half Price Bazar, we are strongly committed to protecting the personal and financial information that you submit to us. Personal information of individual users will not be sold or otherwise transferred to unaffiliated third parties without your approval at the time of collection. However, please note that although we take reasonable steps to protect your information, no website, internet transmission, computer system or wireless connection is completely secure.Half Price Bazar shall ensure to safeguard the security and confidentiality of any information you share with us. Any of your personally identifiable information obtained by us shall not be used or shared other than for the purposes to which you consent. However, despite our utmost efforts to protect your personal information, Half Price Bazar cannot warrant the security of any information you transmit to us through our online services/website. By accepting this Privacy Policy, you accept that such transmission of your personal information is done at your own risk.Your information/inputs/queries as a registered user are required to serve you better and the same shall not be shared with anyone without your consent. However, we may disclose your personal data to agents or contractors of Half Price Bazar and/or its group companies/affiliates to enable processing of transactions or communications with you “on need” basis. Your aforesaid information may be further used for assessment and analysis of our market, customers, products, and services and to understand the way people use our Services so that we can improve them and develop new products and services. However, it shall be on the basis that the agents are required to keep the information confidential and will not use the information for any other purpose other than to carry out the services they are performing for Half Price Bazar and/or its group companies/affiliates."
      },
      {
        id: 'heading',
        'policy_name': 'NO CONTRACTUAL OBLIGATION',
        'policy': "Please note that this Privacy Policy does not create any contractual or other legal rights in or on behalf of any party, nor is it intended to do so."
      },
      {
        id: 'heading',
        'policy_name': 'CONTACT',
        'policy': "If you have questions or concerns about our Privacy Policy or any other policies please write to the grievance officer, 9152555525 or through an email signed with electronic signature sent to help.HPB@ydiconsumer.com"
      },
    ]
  }
}
