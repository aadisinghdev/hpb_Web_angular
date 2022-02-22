export const bannersFilter = {
    1 :{
        1 :{and :[{
            categoryId  : 1,
            sellingPrice  : {
                gte : 250
            },
            productStatus: 'approved',
             status: 'active'
        }]},
        2 :{and :[ {
            categoryId  : {
                in: [16,17,20]
            },
            subCategoryId : {
               in: [104,106,107,110,111,114,115,133]
            },
            sellingPrice  : {
                gte : 199
            },
            productStatus: 'approved',
             status: 'active'
        }]},
        3 : {and :[ {
            categoryId  : {
                in:[2,3]
            },
            subCategoryId : {
                in : [16,17,18,19,25,26,27,28,29]
            },
            internalDiscount  : {
                lte : 60
            },
            productStatus: 'approved',
             status: 'active'
        }]},
        4 : {and :[ {          
            productStatus: 'approved',
             status: 'active'
        }]},

    },
    2 :{
        1 : {and :[{
            categoryId  : 14,
            sellingPrice  : {
                gte : 110
            },
            productStatus: 'approved',
             status: 'active'
        }]},
        2 : {and :[ {
            categoryId  : {
                in: [43,45]
            },
            subcategoryId : {
               in: [290,303,305,314,315,335,336,337]
            },
            sellingPrice  : {
                gte : 199
            },
            productStatus: 'approved',
             status: 'active'
        }]},
        3 : {and :[ {
            categoryId  : {
                in:[14]
            },
            subcategoryId : {
                in : [89]
            },
            internalDiscount  : {
                lte : 80
            },
            productStatus: 'approved',
             status: 'active'
        }]},
        4 : {and :[ { 
            categoryId  : {
                in:[40]
            },
            subcategoryId : {
                in : [233,237]
            },
            internalDiscount  : {
                lte : 60
            },         
            productStatus: 'approved',
             status: 'active'
        }]},

    },
    3 :{
        1 : {and :[{
            
            sellingPrice  : {
                gte : 349
            },
            productStatus: 'approved',
             status: 'active'
        }]},
        2 : {and :[ {
            categoryId  : {
                in: [1,14,15]
            },
            subcategoryId : {
               in: [1,3,4,9,98,99,100,101,102,103,86,87,89,95,96]
            },
            sellingPrice  : {
                gte : 199
            },
            productStatus: 'approved',
             status: 'active'
        }]},
        3 : {and :[ {
            order :['createdAt','desc'],
            limit : 500,
            productStatus: 'approved',
             status: 'active'
        }]},
        4 : {and :[ { 
            internalDiscount  : {
                e : 50
            },         
            productStatus: 'approved',
             status: 'active'
        }]},
        5: {and :[ {
            sellingPrice  : {
                gte : 299
            },
            productStatus: 'approved',
             status: 'active'
        }]},
        6: {and :[{

        }]},
    },
    4 :{
        1 : {and :[{
            categoryId  : {
                in:[1]
            },
            subcategoryId : {
                in : [1]
            },
            internalDiscount  : {
                lte : 70
            },
            productStatus: 'approved',
             status: 'active'
        }]},
        2 : {and :[ {
            categoryId  : {
                in:[1]
            },
            subcategoryId : {
                in : [2]
            },
            internalDiscount  : {
                lte : 60
            },
            productStatus: 'approved',
             status: 'active'
        }]},
        3 : {and :[ {
            categoryId  : {
                in:[2]
            },
            subcategoryId : {
                in : [16,19]
            },
            internalDiscount  : {
                lte : 60
            },
            productStatus: 'approved',
             status: 'active'
        }]},
        4 : {and :[ { 
            categoryId  : {
                in:[16,19]
            },
            subcategoryId : {
                in : [104,105,106,126]
            },
            internalDiscount  : {
                lte : 35
            },         
            productStatus: 'approved',
             status: 'active'
        }]},
    },
    5 : {
        1 : {and :[{
            categoryId  : {
                in:[36]
            },
            internalDiscount  : {
                lte : 60
            },
            productStatus: 'approved',
             status: 'active'
        } ]},
        2 : {and :[ {
            categoryId  : {
                in:[9,22]
            },
            internalDiscount  : {
                lte : 70
            },
            productStatus: 'approved',
             status: 'active'
        }]},
        3 : {and :[ {
            categoryId  : {
                in:[10,23]
            },
            subcategoryId : {
                in : [51,53]
            },
            internalDiscount  : {
                lte : 10
            },
            productStatus: 'approved',
             status: 'active'
        }]},
        4 : {and :[ { 
            categoryId  : {
                in:[36,37]
            },
           sellinPrice  : {
                gte : 139
            },         
            productStatus: 'approved',
             status: 'active'
        }]},
}
}