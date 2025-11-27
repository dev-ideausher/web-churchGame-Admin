import { Fragment } from "react";
import Image from "next/image";

export default function ImageDetailsBox({ title = "Details", details }) {
  return (
    <div className="flex flex-col gap-3 w-2/3">
      <p className="font-medium text-[#4E4C6A] text-base">{title}</p>

      <div className="grid grid-cols-[250px_20px_1fr] items-start gap-y-3 gap-x-5 bg-white  p-2 border border-[#8380B4] rounded-md">
        {details.map((item, index) => (
          <Fragment key={index}>
            <p className="font-medium text-[#4E4C6A] text-base capitalize">{item.label}</p>
            <p className="font-medium text-[#4E4C6A] text-base">:</p>

            {/* VALUE COLUMN */}
            <div className="font-medium text-[#1C1C1C] text-sm">
              {item.type === "image" ? (
                <div
                  onClick={() => window.open(item.value, "_blank")}
                  className="w-11 h-11 cursor-pointer"
                >
                  <Image
                    src={item.value}
                    alt={item.label}
                    width={44}
                    height={44}
                    className="rounded-md object-cover w-11 h-11"
                  />
                </div>
              ) : (
                item.value
              )}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
