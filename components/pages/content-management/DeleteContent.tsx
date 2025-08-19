import DeleteIcon from "@/components/icons/DeleteIcon";
import { DiamondMinus } from "lucide-react";
import React, { useState } from "react";

export default function DeleteContent({ categoryId }: { categoryId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    console.log("Delete this", categoryId);
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer hover:text-red-500"
      >
        <DeleteIcon />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-[1px] flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm">
              <div className="flex items-center justify-center mb-4">
                <DiamondMinus className="w-30 h-14 text-red-500" />
              </div>
              <h3 className="text-xl mb-4 text-wrap text-center text-gray-900">
                Are you sure you want to delete this item?
              </h3>
              <div>
                {/* <p>{item.title}</p> */}
                {/* Add any additional item details if necessary */}
              </div>
              <div className="mt-4 flex gap-4 justify-evenly">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded text-black cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  //   onClick={() => {
                  //     // onDelete(item.id); // Call delete function
                  //     // onClose(); // Close the modal
                  //     handleDelete;
                  //   }}
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
