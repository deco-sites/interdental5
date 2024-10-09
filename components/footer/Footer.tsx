import BackToTop from "$store/components/footer/BackToTop.tsx";
import ColorClasses from "$store/components/footer/ColorClasses.tsx";
import Divider from "$store/components/footer/Divider.tsx";
import Logo from "$store/components/footer/Logo.tsx";
import FooterItems from "$store/components/footer/FooterItems.tsx";
import PaymentMethods, {
  PaymentItem,
} from "$store/components/footer/PaymentMethods.tsx";
import Social from "$store/components/footer/Social.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import SecurityInfo, {
  SecurityContent,
} from "$store/components/footer/SecurityInfo.tsx";
import Contact, { ContactContent } from "$store/components/footer/Contact.tsx";
import PoweredBy, {
  PoweredByContent,
} from "$store/components/footer/PoweredBy.tsx";
import Rights, { RightsContent } from "$store/components/footer/Rights.tsx";
import Icon from "deco-sites/interdental/components/ui/Icon.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Twitter";
  link: string;
}

export interface MobileApps {
  /** @description Link to the app */
  apple?: string;
  /** @description Link to the app */
  android?: string;
}

export interface RegionOptions {
  currency?: Item[];
  language?: Item[];
}

export interface NewsletterForm {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Layout {
  backgroundColor?:
    | "Primary"
    | "Secondary"
    | "Accent"
    | "Base 100"
    | "Base 100 inverted";
  variation?:
    | "Variation 1"
    | "Variation 2"
    | "Variation 3"
    | "Variation 4"
    | "Variation 5";
  hide?: {
    logo?: boolean;
    newsletter?: boolean;
    sectionLinks?: boolean;
    contact?: boolean;
    socialLinks?: boolean;
    paymentMethods?: boolean;
    securityInfo?: boolean;
    poweredBy?: boolean;
    rights?: boolean;
    backToTheTop?: boolean;
  };
}

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
  };
  newsletter?: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: NewsletterForm;
  };
  sections?: Section[];

  /** @title Contact */
  contact?: ContactContent;

  social?: {
    title?: string;
    items: SocialItem[];
  };
  payments?: {
    title?: string;
    items: PaymentItem[];
  };

  /** @title Security */
  securityInfo?: SecurityContent;

  poweredBy?: PoweredByContent;

  rights?: RightsContent;

  backToTheTop?: {
    text?: string;
  };
  layout?: Layout;
}

function Footer({
  logo,
  newsletter = {
    title: "Newsletter",
    description: "",
    form: { placeholder: "", buttonText: "", helpText: "" },
  },
  sections = [{
    "label": "Sobre",
    "items": [
      {
        "href": "/quem-somos",
        "label": "Quem somos",
      },
      {
        "href": "/termos-de-uso",
        "label": "Termos de uso",
      },
      {
        "href": "/trabalhe-conosco",
        "label": "Trabalhe conosco",
      },
    ],
  }, {
    "label": "Atendimento",
    "items": [
      {
        "href": "/centraldeatendimento",
        "label": "Central de atendimento",
      },
      {
        "href": "/whatsapp",
        "label": "Fale conosco pelo WhatsApp",
      },
      {
        "href": "/trocaedevolucao",
        "label": "Troca e devolução",
      },
    ],
  }],
  contact = {
    title: "Contate-nos",
    email: {
      emailAddress: "",
      buttonLabel: "E-mail",
    },
    phone: {
      phoneNumber: "(99) 99999-9999",
    },
    workingHours: {
      title: "Horário de atendimento",
      description: "de segunda à domingo, xxhs às xxhs",
    },
  },
  social = {
    title: "Redes sociais",
    items: [{ label: "Instagram", link: "/" }, { label: "Tiktok", link: "/" }],
  },
  payments = {
    title: "Formas de pagamento",
    items: [{ label: "Mastercard" }, { label: "Visa" }, { label: "Pix" }],
  },
  securityInfo = {
    title: "Segurança",
    items: [],
  },
  poweredBy = {
    items: [],
  },
  rights = {
    phrase: "",
  },
  backToTheTop,
  layout = {
    variation: "Variation 1",
    hide: {
      logo: false,
      newsletter: false,
      sectionLinks: false,
      contact: false,
      socialLinks: false,
      paymentMethods: false,
      securityInfo: false,
      poweredBy: false,
      backToTheTop: false,
    },
  },
}: Props) {
  const _logo = layout?.hide?.logo ? <></> : <Logo logo={logo} />;
  const _newsletter = layout?.hide?.newsletter ? <></> : (
    <Newsletter
      content={newsletter}
      layout={{
        tiled: layout?.variation == "Variation 4" ||
          layout?.variation == "Variation 5",
      }}
    />
  );
  const _sectionLinks = layout?.hide?.sectionLinks ? <></> : (
    <FooterItems
      sections={sections}
      justify={layout?.variation == "Variation 2" ||
        layout?.variation == "Variation 3"}
    />
  );
  const _contact = layout?.hide?.contact
    ? <></>
    : <Contact content={contact} />;
  const _social = layout?.hide?.socialLinks
    ? <></>
    : <Social content={social} vertical={layout?.variation == "Variation 3"} />;
  const _payments = layout?.hide?.paymentMethods
    ? <></>
    : <PaymentMethods content={payments} />;
  const _security = layout?.hide?.securityInfo
    ? <></>
    : <SecurityInfo content={securityInfo} />;
  const _poweredBy = layout?.hide?.poweredBy
    ? <></>
    : <PoweredBy content={poweredBy} />;

  const _rights = layout?.hide?.rights ? <></> : <Rights content={rights} />;

  const _backToTop = layout?.hide?.backToTheTop
    ? <></>
    : <BackToTop content={backToTheTop?.text} />;

  return (
    <footer
      class={`${
        ColorClasses(layout)
      } w-full flex flex-col pt-5 xl:pt-14 px-0 lg:px-0 lg:pb-0 xl:px-0 !bg-[#FFF] pb-[100px] md:pb-10  xl:gap-10`}
    >
      <div>
        {(!layout?.variation || layout?.variation == "Variation 1") && (
          <div class="flex flex-col gap-[1.25rem] lg:gap-0 xl:gap-10">
            <div class="xl:container xl:mx-auto lg:p-4 xl:p-0 px-[1rem] ">
              <div class="flex flex-col md:flex-row md:flex-wrap xl:flex-nowrap gap-9 lg:gap-8 xl:mb-8">
                {_sectionLinks}
                {_contact}
              </div>
              <div class="hidden xl:flex">
                <Divider />
              </div>
              <div class="flex flex-col md:flex-row gap-5 md:gap-14 md:items-center pt-[36px] justify-between xl:pt-10">
                {_payments}
                {_security}
                {_social}
              </div>
            </div>
            <div class="bg-[#F9F9FF]">
              {_logo}
              <div class="px-4 xl:px-0">
                <Divider />
              </div>
              <div class="flex xl:hidden flex-col text-black lg:pt-10 pt-[20px]">
                <div class="text-center text-xs font-bold">
                  Indental Prod. Odontologic. Med e Hospt. Ltda - CNPJ
                  07.788.510/0001-14
                </div>
                <div class="flex items-center gap-6 h-5 mt-8 mx-4 xl:mx-[auto] mb-10 lg:mb-0">
                  <span class="flex items-center gap-2 text-xs font-normal leading-4">
                    Feito por <Icon id={"B8one"} size={42} />
                  </span>
                  <span class="flex items-center gap-2 text-xs font-normal leading-4">
                    Tecnologia <Icon id={"Vtex"} size={56} />
                  </span>
                </div>
              </div>
              <div class="hidden xl:flex flex-row justify-between gap-10 relative xl:container pb-[50px] xl:pt-[2rem]">
                {_poweredBy}
                <div className="absolute inset-x-0 w-fit m-auto">
                  {_rights}
                </div>
                {_backToTop}
              </div>
            </div>
          </div>
        )}
        {layout?.variation == "Variation 2" && (
          <div class="flex flex-col gap-[1.25rem] lg:gap-0 xl:gap-10">
            <div class="flex flex-col md:flex-row gap-10">
              <div class="flex flex-col gap-10 xl:w-1/2">
                {_social}
                {_payments}
              </div>
              <div class="flex flex-col gap-10 xl:gap-20 xl:w-1/2 xl:pr-10">
                {_newsletter}
                {_sectionLinks}
              </div>
            </div>
            <Divider />
            <div class="hidden xl:flex flex-col-reverse justify-between relative">
              {_poweredBy}
              <div className="absolute inset-x-0 w-fit m-auto">
                {_rights}
              </div>
              {_backToTop}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 3" && (
          <div class="flex flex-col gap-[1.25rem] lg:gap-0 xl:gap-10">
            <div class="flex flex-col xl:flex-row gap-14">
              <div class="flex flex-col md:flex-row xl:flex-col md:justify-between xl:justify-normal gap-10 xl:w-2/5">
                {_newsletter}
                <div class="flex flex-col gap-10">
                  {_payments}
                </div>
              </div>
              <div class="flex flex-col gap-10 xl:gap-20 xl:w-3/5 xl:items-end">
                <div class="flex flex-col md:flex-row gap-10">
                  {_sectionLinks}
                  {_social}
                </div>
              </div>
            </div>
            <Divider />
            <div class="hidden xl:flex flex-col-reverse justify-between relative">
              {_poweredBy}
              <div className="absolute inset-x-0 w-fit m-auto">
                {_rights}
              </div>
              {_backToTop}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 4" && (
          <div class="flex flex-col gap-[1.25rem] lg:gap-0 xl:gap-10">
            {_newsletter}
            {layout?.hide?.newsletter ? <></> : <Divider />}
            <div class="flex flex-col xl:flex-row gap-10 xl:gap-20 xl:justify-between">
              {_sectionLinks}
              <div class="flex flex-col md:flex-row xl:flex-col gap-10 xl:gap-10 xl:w-2/5 xl:pl-10">
                <div class="flex flex-col md:flex-row gap-10 xl:gap-20">
                  <div class="xl:flex-auto">
                    {_payments}
                  </div>
                  <div class="xl:flex-auto">
                    {_social}
                  </div>
                </div>
              </div>
            </div>
            <Divider />
            <div class="hidden xl:flex flex-col justify-between relative">
              {_poweredBy}
              <div className="absolute inset-x-0 w-fit m-auto">
                {_rights}
              </div>
            </div>
            {_backToTop}
          </div>
        )}
        {layout?.variation == "Variation 5" && (
          <div class="flex flex-col gap-[1.25rem] lg:gap-0 xl:gap-10">
            {_newsletter}
            {layout?.hide?.newsletter ? <></> : <Divider />}

            <div class="flex flex-col md:flex-row gap-10 xl:gap-20 md:justify-between">
              {_sectionLinks}
              <div class="flex flex-col gap-10 md:w-2/5 xl:pl-10">
                {_payments}
                {_social}
              </div>
            </div>
            <Divider />
            <div class="hidden xl:flexflex flex-col-reverse justify-between relative">
              {_poweredBy}
              <div className="absolute inset-x-0 w-fit m-auto">
                {_rights}
              </div>
            </div>
            {_backToTop}
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
