import { ArrowRight, Plus, SquarePen } from "lucide-react";
import { useRef, useState } from "react";
import type { EventData } from "../types/eventType";
import Spinner from "../components/spinner";
import { useNavigate } from "react-router-dom";


function Event() {
  const [showCapacity, setShowCapacity] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [links, setLinks] = useState([""]);
  const [eventName, setEventName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const ImageInputRef = useRef<HTMLInputElement | null>(null);
  const backgroundImageInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();


  const addLink = () => {
    setLinks([...links, ""]);
  };

  const updateLink = (index: number, value: string) => {
    const updatedLinks = [...links];
    updatedLinks[index] = value;
    setLinks(updatedLinks);
  };
  

  const handleEditClick = () => {
    ImageInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result as string;

      // set for full screen background
      setImage(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleBackgroundImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result as string;

      // set for full screen background
      setBackgroundImage(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleDateChange = (value: string) => {
  const selected = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selected < today) {
    setError("Event Date must be sometime in the future");
    return
  }

  setDateTime(value);
};

  

  const handleGoLive = () => {
    if(!eventName.trim()){
    setError("Event name is required")
    return;
   }
   
   if(!phone.trim()){
    setError("Phone number is required")
    return;
   }

   if(!dateTime.trim()){
    setError("Date is required")
    return;
   }

   if(!location.trim()){
    setError("Location is required")
    return;
   }

   if(!cost.trim()){
    setError("Cost is required")
    return;
   }

   if(!description.trim()){
    setError("Event Description is required")
    return;
   }

  const uuid = crypto.randomUUID();

  const eventPayload: EventData = {
    id: uuid,
    eventName,
    phone,
    dateTime,
    location,
    cost,
    description,
    capacity: showCapacity ? capacity : null,
    links: showLinks ? links.filter((l) => l.trim() !== "") : [],
    image,
    backgroundImage,
    createdAt: new Date().toISOString(),
  };

  setIsLoading(true);
  setError(null);

  try {
    // Save event (mock backend)
    localStorage.setItem(`event:${uuid}`, JSON.stringify(eventPayload));

    console.log("EVENT STORED BY ID", eventPayload);

    // Navigate to live event page
    navigate(`/events/${uuid}`);
  } catch (error) {
    console.error("FAILED TO STORE EVENT ", error);
    setError("Unexpected error occurred");
  } finally {
    setIsLoading(false);
  }
};


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
          let’s hang
        </h2>
      </div>
      <div className="flex w-[1440px] h-[1024px] pt-[32px] pb-[48px] px-[95px] gap-[72px]">
        <div className="w-[520px] h-[607px] gap-[16px] flex flex-col">
          <div
            className="relative w-[520px] h-[520px] rounded-[16px] overflow-hidden bg-[#1f1f1f]"
            style={{
              backgroundImage: image ? `url(${image})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <input
              ref={ImageInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <input
              ref={backgroundImageInputRef}
              type="file"
              accept="image/*"
              onChange={handleBackgroundImageChange}
              className="hidden"
            />
            {/* Edit icon */}
            <div
              onClick={handleEditClick}
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
              <SquarePen size={18} className="text-[white]" />
            </div>
          </div>
          <button
            onClick={() => backgroundImageInputRef.current?.click()}
            className="w-[520px] h-[71px] rounded-[16px] py-[12px] px-[20px] flex gap-[12.9px] items-center justify-center bg-[#C2C2C280] border-none cursor-pointer"
          >
            <span>🖼️</span>
            <span className="font-[500] text-[16px] text-[#FFFFFF]">
              Change background
            </span>
          </button>
        </div>

        <div className="w-[682px] h-[924px] gap-[32px] flex flex-col">
          <div className="h-[57px]">
            <input
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="font-sans flex-1 outline-none border-none bg-transparent placeholder-[#C2C2C2] text-[#C2C2C2] text-[48px] font-[600]"
              placeholder="Enter your event name"
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
            <div className="flex items-center justify-center h-[32px] w-[32px] rounded-[8px] bg-[#C2C2C280] cursor-pointer">
              <ArrowRight className="text-[white] w-[15.82px] h-[15.82px]" />
            </div>
          </div>

          <div className="bg-[#252525]/55 backdrop-blur-md h-[200px] rounded-[16px] px-[16px] py-[20px] w-[682px] flex flex-col">
            <div className="flex items-center rounded-[16px] w-[650px] h-[36px] p-[8px] gap-[16px] mb-[10px]">
              <div className="text-[16px]">🗓️</div>
              <input
                type="date"
                value={dateTime}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => handleDateChange(e.target.value)}
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
            />
          </div>

          {/* Capacity */}
          {showCapacity && (
            <div className="flex items-center rounded-[16px] w-[682px] bg-[#252525]/55 backdrop-blur-md h-[64px] p-[16px] gap-[8px]">
              <div className="text-[16px]">👥</div>
              <input
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
                <div key={index} className="flex items-center gap-[8px]">
                  <div className="text-[16px]">🔗</div>
                  <input
                    type="text"
                    placeholder={`Add link ${index + 1}`}
                    value={link}
                    onChange={(e) => updateLink(index, e.target.value)}
                    className="flex-1 outline-none border-none bg-transparent placeholder-[white] text-[white]"
                  />
                </div>
              ))}

              <div
                onClick={addLink}
                className="text-[white] flex gap-[8px] justify-center cursor-pointer"
              >
                <Plus size={16} />
                <span>Add another link</span>
              </div>
            </div>
          )}

          <div className="flex gap-[8px] h-[43px]">
            {!showCapacity && (
              <div
                onClick={() => setShowCapacity((prev) => !prev)}
                className="h-[43px] rounded-[16px] py-[12px] px-[20px] gap-[12.19px]  bg-[#C2C2C280] flex items-center justify-center cursor-pointer"
              >
                <Plus className="text-[white]" />
                <span className="text-[16px] font-[600] text-[white]">
                  Capacity
                </span>
              </div>
            )}
            <div className="h-[43px] rounded-[16px] py-[12px] px-[20px] gap-[12.19px] bg-[#C2C2C280] flex items-center justify-center cursor-pointer">
              <Plus className="text-[white]" />
              <span className="text-[16px] font-[600] text-[white]">
                Photo gallary
              </span>
            </div>
            {!showLinks && (
              <div
                onClick={() => setShowLinks((prev) => !prev)}
                className="h-[43px] rounded-[16px] py-[12px] px-[20px] gap-[12.19px] bg-[#C2C2C280] flex items-center justify-center cursor-pointer"
              >
                <Plus className="text-[white]" />
                <span className="text-[16px] font-[600] text-[white]">
                  Links
                </span>
              </div>
            )}

            <div className="h-[43px] w-[120px] py-[12px] px-[20px] gap-[12.19px] bg-transparent flex items-center justify-center cursor-pointer">
              <span className="text-[16px] font-[600] text-[#7F7F7F80]">
                Show more
              </span>
            </div>
          </div>

          <div className="h-[242px] rounded-[16px] w-[682px] p-[16px] bg-[#252525]/55 backdrop-blur-md flex flex-col gap-[16px]">
            <div className="w-[642.26px] h-[146.38485717773438px] flex justify-center items-center">
              <span className="font-[600] text-[20px] text-[white]">
                Customize your
                <br /> event your way
              </span>
            </div>
            <button className="w-[650px] h-[43px] rounded-[8px] bg-[#C2C2C280] border-none flex gap-[12.9px] items-center justify-center cursor-pointer">
              <span>🎨</span>
              <span className="text-[white] text-[16px] font-[600]">
                Customize
              </span>
            </button>
          </div>

          <button
            onClick={handleGoLive}
            className="w-[682px] h-[71px] rounded-[16px] bg-[#252525]/55 backdrop-blur-md px-[12px] py-[20px] border-none flex flex-col gap-[12px] items-center justify-center cursor-pointer"
            disabled={isLoading}
          >
            {
              isLoading ? (
                <Spinner />
              ):
              (
                <>
                  <span>🚀</span>
                  <span className="text-[white] text-[16px] font-[600]">Go Live</span>
                </>
              )
            }
          </button>
            {
            error && (
            <div>
              <p className="text-[red] font-bold text-center">{error}</p>
            </div>
            )
          }
        </div>

        
      </div>
    </div>
  );
}

export default Event;
