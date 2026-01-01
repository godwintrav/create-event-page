import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { EventData } from "../types/eventType";
import Spinner from "../components/spinner";
import { goToExternalLink } from "../utils/utils";

function LiveEvent() {
  const { id } = useParams<{ id: string }>();

  const [eventName, setEventName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [links, setLinks] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  const [showCapacity, setShowCapacity] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid event id");
      setIsLoading(false);
      return;
    }

    try {
      const raw = localStorage.getItem(`event:${id}`);

      if (!raw) {
        setError("Event not found");
        return;
      }

      const event: EventData = JSON.parse(raw);

      setEventName(event.eventName);
      setPhone(event.phone);
      setDateTime(event.dateTime);
      setLocation(event.location);
      setCost(event.cost);
      setDescription(event.description);
      setCapacity(event.capacity ?? "");
      setLinks(event.links ?? []);
      setImage(event.image ?? null);
      setBackgroundImage(event.backgroundImage ?? null);

      setShowCapacity(!!event.capacity);
      setShowLinks((event.links?.length ?? 0) > 0);
    } catch {
      setError("Failed to load event");
    } finally {
      setIsLoading(false);
    }
  }, [id]);



  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-bold">{error}</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : "linear-gradient(to bottom right, #F1C2DB, #46497C)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Main section */}
      <div className="px-[95px] h-[80px] flex items-center text-[white]">
        <h2 className=" font-[700] text-[32px] text-black font-syne leading-[100%] tracking-[-0.29px]">
          Let’s Hang
        </h2>
      </div>
      <div className="flex max-w-[1440px] w-full min-h-screen pt-[32px] pb-[48px] px-[95px] gap-[72px] mx-auto">
        <div className="w-[520px] flex flex-col gap-[16px] shrink-0">
          <div
            className="relative w-[520px] h-[520px] rounded-[16px] overflow-hidden bg-[#1f1f1f]"
            style={{
              backgroundImage: image ? `url(${image})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <input
              disabled={true}
              type="file"
              accept="image/*"
              className="hidden"
            />

            <input
              type="file"
              accept="image/*"
              disabled={true}
              className="hidden"
            />
            {/* Edit icon */}
            <div
              className="
                absolute 
                top-[458px] left-[458px]
                h-[40px] w-[40px]
                rounded-full
                bg-[#2525258C] /55 backdrop-blur-md
                flex items-center justify-center
                cursor-pointer
                hover:bg-[#252525]/90
                transition"
            >
            </div>
          </div>
          <button
            disabled={true}
            className="w-[520px] h-[71px] rounded-[16px] py-[12px] px-[20px] flex gap-[12.9px] items-center justify-center bg-[#C2C2C280] border-none cursor-pointer"
          >
            <span>🖼️</span>
            <span className="font-[500] text-[16px] text-[#FFFFFF]">
              Change background
            </span>
          </button>
        </div>

        <div className="w-full max-w-[682px] flex flex-col gap-[32px] overflow-visible">
          <div className="h-[57px]">
            <input
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="font-sans flex-1 outline-none border-none bg-transparent placeholder-[#C2C2C2] text-[#C2C2C2] text-[48px] font-[600]"
              disabled={true}
            />
          </div>

          <div className="flex items-center rounded-[16px] w-[682px] bg-[#252525]/55 backdrop-blur-md h-[64px] p-[16px] gap-[8px]">
            <div className="text-[16px]">💾</div>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="Enter phone number to save to draft"
              className="flex-1 outline-none border-none bg-transparent placeholder-[white] text-[white]"
            />
          </div>

          <div className="bg-[#252525]/55 backdrop-blur-md h-[200px] rounded-[16px] px-[16px] py-[20px] w-[682px] flex flex-col">
            <div className="flex items-center rounded-[16px] w-[650px] h-[36px] p-[8px] gap-[16px] mb-[10px]">
              <div className="text-[16px]">🗓️</div>
              <input
                type="date"
                value={dateTime}
                min={new Date().toISOString().split("T")[0]}
                disabled={true}
                placeholder="Date and Time"
                className="flex-1 outline-none border-none bg-transparent placeholder-[white] text-[white]"
              />
            </div>

            <div className="w-[650px] h-[1px] bg-[#C2C2C280] mb-[10px]"></div>

            <div className="flex items-center rounded-[16px] w-[650px] h-[36px] p-[8px] gap-[16px] mb-[10px]">
              <div className="text-[16px]">📍</div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="flex-1 outline-none border-none bg-transparent placeholder-[white] text-[white]"
              />
            </div>

            <div className="w-[650px] h-[1px] bg-[#C2C2C280] mb-[10px]"></div>

            <div className="flex items-center rounded-[16px] w-[650px] h-[36px] p-[8px] gap-[16px] mb-[10px]">
              <div className="text-[16px]">💵</div>
              <input
                type="text"
                placeholder="Cost per Person"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="flex-1 outline-none border-none bg-transparent placeholder-[white] text-[white]"
              />
            </div>
          </div>

          <div className="flex items-center rounded-[16px] w-[682px] bg-[#252525]/55 backdrop-blur-md h-[75px] px-[16px] pt-[16px] pb-[40px] gap-[8px]">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your event"
              className="flex-1 outline-none border-none bg-transparent placeholder-[white] text-[white]"
              disabled={true}
            />
          </div>

          {/* Capacity */}
          {showCapacity && (
            <div className="flex items-center rounded-[16px] w-[682px] bg-[#252525]/55 backdrop-blur-md h-[64px] p-[16px] gap-[8px]">
              <div className="text-[16px]">👥</div>
              <input
                disabled={true}
                type="text"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="Enter Capacity"
                className="flex-1 outline-none border-none bg-transparent placeholder-[white] text-[white]"
              />
            </div>
          )}

          {/* Links */}
          {showLinks && (
            <div className="flex flex-col rounded-[16px] w-[682px] bg-[#252525]/55 backdrop-blur-md p-[16px] gap-[16px]">
              {links.map((link, index) => (
                <div key={index} className="flex items-center gap-[8px]" >
                  <div className="text-[16px]">🔗</div>
                  <button
                    className="flex-1 outline-none border-none bg-transparent placeholder-[white] text-[white]"
                    onClick={() => goToExternalLink(link)}
                  >{link}</button>
                </div>
              ))}

            </div>
          )}
          </div>

        </div>
      </div>
  );
}

export default LiveEvent;
