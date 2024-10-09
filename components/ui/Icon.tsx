import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  | "AboutUs"
  | "ActiveDot"
  | "ArrowsPointingOut"
  | "BannerLeft"
  | "BannerLeftHover"
  | "BannerRight"
  | "BannerRightHover"
  | "Amex"
  | "aboutUsBackground"
  | "Bars3"
  | "Benefit1"
  | "Benefit2"
  | "Benefit3"
  | "Benefit4"
  | "Benefit5"
  | "BuyEqual"
  | "BuyPlus"
  | "Card"
  | "CartDrawer"
  | "CartPDP"
  | "ChevronLeft"
  | "ChevronRight"
  | "ChevronRightPagination"
  | "ChevronLeftPagination"
  | "ChevronUp"
  | "ChevronDown"
  | "ChevronDownPDP"
  | "ContactUs"
  | "ChevronUpPdc"
  | "ChevronDownPdc"
  | "CreditCard"
  | "CloseFilters"
  | "Deco"
  | "desktopMarkX"
  | "Diners"
  | "Discord"
  | "Discount"
  | "DiscountBadge"
  | "Dot"
  | "Edit"
  | "Email"
  | "Elo"
  | "Facebook"
  | "FilterList"
  | "Hamburguer"
  | "Heart"
  | "HeartPDP"
  | "Help"
  | "IconUpMobile"
  | "IconNewsletter"
  | "Hipercard"
  | "Instagram"
  | "IconFilter"
  | "Laser"
  | "Linkedin"
  | "Minus"
  | "MinusPDP"
  | "MarkXBackground"
  | "MarkXBackgroundMobile"
  | "MapPin"
  | "MagnifyingGlass"
  | "Mastercard"
  | "MenuDrawer"
  | "Message"
  | "NotFoundBulletPoint"
  | "PayPal"
  | "Phone"
  | "Pix"
  | "PixPDP"
  | "Plus"
  | "PlusPDP"
  | "ProductNotAvailableIcon"
  | "QuestionMarkCircle"
  | "Return"
  | "Ruler"
  | "Search"
  | "SearchDrawer"
  | "ShoppingCart"
  | "Star"
  | "Tiktok"
  | "Tooth"
  | "Trash"
  | "Truck"
  | "Twitter"
  | "User"
  | "UserMobile"
  | "UserDrawer"
  | "Visa"
  | "WhatsApp"
  | "WhatsAppDrawer"
  | "XMark"
  | "Zoom"
  | "LetsEncrypt"
  | "PCI"
  | "PhoneIcon"
  | "B8one"
  | "Vtex"
  | "NewsletterIcon";

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="Bell" />
   */
  id: AvailableIcons;
  size?: number;
}

function Icon({
  id,
  strokeWidth = 16,
  size,
  width,
  height,
  ...otherProps
}: Props) {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
      strokeWidth={strokeWidth}
    >
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;
