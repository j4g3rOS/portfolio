# Cloudflare support request — kenziservices.co.uk

This file contains a draft support message to send to Cloudflare about MXToolbox warnings regarding the SOA record and confirmation of HTTP -> HTTPS behavior.

---

Subject

Please confirm SOA serial/expire values for kenziservices.co.uk (MXToolbox warnings)

Body

Hello Cloudflare Support,

MXToolbox is reporting two DNS warnings for my zone kenziservices.co.uk:

- “SOA Serial Number Format is Invalid”
- “SOA Expire Value out of recommended range”

My SOA record is:

armando.ns.cloudflare.com. dns.cloudflare.com. 2414034390 10000 2400 604800 1800

Additionally, MXToolbox previously reported an HTTP probe TLS error for http://kenziservices.co.uk, but the domain currently returns a 301 → https://kenziservices.co.uk/ (served by Cloudflare).

Please confirm:
1) Whether the SOA serial (2414034390) and expire (604800) values are expected for Cloudflare-managed zones.
2) If these values are standard, can you advise why external monitors such as MXToolbox flag them and whether any action is required on my side to remove those external warnings?
3) If Cloudflare can adjust any zone settings to mitigate external monitoring warnings (or if you recommend any guidance to give to MXToolbox), please advise.

If you need any additional zone details or diagnostics from me, let me know and I’ll provide them. Thanks.

— Krzysztof Marek Scibiorek / Kenzi Services

---

Notes

- SOA output (from `dig SOA kenziservices.co.uk +short`):
  `armando.ns.cloudflare.com. dns.cloudflare.com. 2414034390 10000 2400 604800 1800`

- HTTP probe now returns a 301 redirect to HTTPS:
  `curl -I http://kenziservices.co.uk` -> `HTTP/1.1 301 Moved Permanently` and `Location: https://kenziservices.co.uk/` (Server: cloudflare)

- This file is intended as a ready-to-send support message; you can paste the body into Cloudflare Support ticket UI or copy it into an email.

---

Next steps I can take for you:
- Open a Cloudflare support ticket draft for you (I cannot submit directly) and provide the ticket content.
- Draft a brief message for MXToolbox support asking them to re-check or explain the warning.
- Do nothing further if you prefer to leave these informational warnings as-is (they are benign for Cloudflare-managed zones).
