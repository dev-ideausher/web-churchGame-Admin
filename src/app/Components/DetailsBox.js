import { Fragment } from "react";
import Image from "next/image";

export default function ImageDetailsBox({ title = "Details", details }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <p className="font-medium text-[#4E4C6A] text-base capitalize">{title}</p>

      <div className="grid grid-cols-[250px_20px_1fr] items-start gap-y-3 gap-x-5 bg-white  p-2 border border-[#8380B4] rounded-md">
        {details.map((item, index) => (
          <Fragment key={index}>
            <p className="font-medium text-[#4E4C6A] text-base capitalize">
              {item.label}
            </p>
            <p className="font-medium text-[#4E4C6A] text-base">:</p>

            {/* VALUE COLUMN */}
            <div
              title={item.value}
              className="font-medium text-[#1C1C1C] text-sm truncate"
            >
              {item.type === "image" ? (
                item.value ? (
                  <div
                    onClick={() => window.open(item.value, "_blank")}
                    className="w-20 h-20 cursor-pointer"
                  >
                    <img
                      src={item.value}
                      alt={item.label}
                      className="rounded-md object-cover w-20 h-20"
                    />
                  </div>
                ) : (
                  <span className="text-gray-400 italic">
                    No image available
                  </span>
                )
              ) : (
                item.value || "N/A"
              )}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
