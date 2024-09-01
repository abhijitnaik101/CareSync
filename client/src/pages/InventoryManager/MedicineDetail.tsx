import React from "react";

interface MedicineDetailProps {
  medicineName: string;
  inStock: number;
  expDate: string;
  mfgDate: string;
  price: number;
  category: string;
  type: string;
  description: string;
}

const MedicineDetail: React.FC<MedicineDetailProps> = ({
  medicineName,
  inStock,
  expDate,
  mfgDate,
  price,
  category,
  type,
  description,
}) => {
  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="flex flex-col md:flex-row w-full max-w-[707px] h-full max-h-[608px] mx-auto bg-white rounded-lg shadow-lg p-10 box-border mt-8">
        <div className="px-5">
          <div className="flex-shrink-0 justify-between mb-6 md:mb-0 pb-[20px]">
            <img
              className="w-32 h-32 md:w-48 md:h-48 mx-auto md:mx-0"
              src="https://via.placeholder.com/150"
              alt="Medicine"
            />
          </div>
          <button className="border-2 border-black rounded-[5px] px-[35px] bg-gray-200 ">
            Edit
          </button>
        </div>
        <div className="px-5">
          <h2 className="text-3xl font-bold mb-2">{medicineName}</h2>
          <div className="flex flex-col py-[10px]">
            <div className="">In Stock: </div>
            <div className="flex justify-between px-[30px]">
              <div className="border-[2px] rounded-md px-[30px] py-[5px] bg-gray-100">
                {inStock}
              </div>
              <button className="border-[2px] px-[30px] py-[5px] rounded-md bg-gray-100">
                Order
              </button>
            </div>
          </div>

          <div className="flex flex-row justify-between p-[5px] py-[20px]">
            <div className="pr-[20px]">
              <p className="">Exp. Date: </p>
              <div className="border-[2px] px-[30px] py-[5px] rounded-md bg-gray-100">
                {expDate}
              </div>
            </div>
            <div className="pl-[20px]">
              <p className="">Mfg. Date: </p>
              <div className="border-[2px] px-[30px] py-[5px] rounded-md bg-gray-100">
                {mfgDate}
              </div>
            </div>
          </div>

          <div className="py-[20px]">
            <p className="text-gray-500">Price: ₹</p>
            <div className="border-[2px] w-20 px-[30px] py-[5px] rounded-md bg-gray-100">
              {price}
            </div>
          </div>

          <div className="flex justify-between mt-2">
            <div>
              <p className="text-gray-500">Category: </p>
              <div className="border-[2px] px-[30px] py-[5px] rounded-md bg-gray-100">
                {category}
              </div>
            </div>
            <div>
              <p className="text-gray-500">Type: </p>
              <div className="border-[2px] px-[30px] py-[5px] rounded-md bg-gray-100">
                {type}
              </div>
            </div>
          </div>
          <div className="py-[20px]">
            <p>Description</p>
            <div className="border-[2px] px-[30px] py-[5px] rounded-md h-20 bg-gray-100">
              {description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetail;
