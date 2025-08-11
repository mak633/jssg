'use client';

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@radix-ui/react-collapsible';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { JSX } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shared/components/primitives/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from '@shared/components/primitives/sidebar';

export type NavSection = {
  title: string;
  items: (
    | {
        title: string;
        icon: JSX.Element;
        'data-testid': string;
        items: {
          title: string;
          url: string;
          'data-testid': string;
        }[];
      }
    | {
        title: string;
        url: string;
        icon: JSX.Element;
        'data-testid': string;
      }
  )[];
};

type Props = {
  sections: NavSection[];
} & React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ sections, ...props }: Props) {
  const pathname = usePathname();
  const { state, isMobile } = useSidebar();

  const isActiveLink = (url: string) => {
    return pathname === url || pathname.startsWith(url + '/');
  };

  const hasActiveSubItem = (items: { title: string; url: string }[]) => {
    return items.some((item) => isActiveLink(item.url));
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="pt-4">
        <SidebarMenu className="items-center">
          <Image
            src="https://wealth.jsafrasarasin.com/public/assets/bjss/assets/images/bjss-theme-logo.svg"
            alt="Logo"
            width="180"
            height="30"
            priority
          />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {sections.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarMenu>
              {section.items.map((item) => {
                if ('url' in item) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={isActiveLink(item.url)}
                      >
                        <Link href={item.url} data-testid={item['data-testid']}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                if (state === 'collapsed') {
                  return (
                    <DropdownMenu key={item.title}>
                      <SidebarMenuItem>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuButton
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            tooltip={item.title}
                            data-testid={item['data-testid']}
                          >
                            {item.icon}
                          </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        {item.items?.length ? (
                          <DropdownMenuContent
                            side={isMobile ? 'bottom' : 'right'}
                            align={isMobile ? 'end' : 'start'}
                            className="min-w-56 rounded-lg"
                          >
                            {item.items.map((item) => (
                              <DropdownMenuItem asChild key={item.title}>
                                <a
                                  href={item.url}
                                  data-testid={item['data-testid']}
                                >
                                  {item.title}
                                </a>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        ) : null}
                      </SidebarMenuItem>
                    </DropdownMenu>
                  );
                }

                return (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={hasActiveSubItem(item.items)}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          data-testid={item['data-testid']}
                        >
                          {item.icon}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isActiveLink(subItem.url)}
                              >
                                <Link
                                  href={subItem.url}
                                  data-testid={subItem['data-testid']}
                                >
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
