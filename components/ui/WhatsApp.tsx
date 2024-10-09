import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

export interface Props {
  phone?: number;
  icon?: AvailableIcons;
  size?: number;
}

function WhatsApp({ phone, icon = "WhatsApp", size = 32 }: Props) {
  if (!phone) {
    return null;
  }

  return (
    <a
      href={`https://api.whatsapp.com/send/?phone=${phone}&text&type=phone_number&app_absent=0`}
      class="h-8 pl-2 lg:fixed lg:bottom-6 lg:right-6 lg:z-40"
      aria-label="Chat on WhatsApp"
      target="_blank"
    >
      <button
        class="lg:bg-[#45D268] lg:text-white lg:p-2 lg:rounded-full lg:shadow-lg"
        aria-label="Chat on WhatsApp"
      >
        <Icon id={icon} size={size} />
      </button>
    </a>
  );
}

export default WhatsApp;
