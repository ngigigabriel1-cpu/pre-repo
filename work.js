/**
 * Eden Consultants — Shared Navigation Script
 * Handles: hamburger toggle, overlay, accordion submenus, ESC/resize cleanup, scroll reveal
 */
(function () {
    'use strict';

    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('main-nav');
    if (!hamburger || !navLinks) return;

    /* ── Overlay ──────────────────────────────────────────────── */
    function createOverlay() {
        if (document.getElementById('nav-overlay')) return;
        const ov = document.createElement('div');
        ov.id = 'nav-overlay';
        Object.assign(ov.style, {
            position: 'fixed', inset: '0',
            zIndex: '1500',
            background: 'rgba(0,0,0,0.28)'
        });
        ov.addEventListener('click', () => setNavOpen(false));
        document.body.appendChild(ov);
    }
    function removeOverlay() {
        const ov = document.getElementById('nav-overlay');
        if (ov) ov.remove();
    }

    /* ── Open / Close ─────────────────────────────────────────── */
    function setNavOpen(open) {
        navLinks.classList.toggle('open', open);
        hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
        hamburger.textContent = open ? '✕' : '☰';
        document.body.style.overflow = open ? 'hidden' : '';
        if (open) createOverlay(); else removeOverlay();
    }

    hamburger.addEventListener('click', () =>
        setNavOpen(!navLinks.classList.contains('open'))
    );

    /* ── Close on any non-dropdown link click ─────────────────── */
    navLinks.querySelectorAll('a').forEach(a => {
        if (a.matches('.dropdown > a')) return;
        a.addEventListener('click', () => setNavOpen(false));
    });

    /* ── Top-level dropdown toggle (mobile) ───────────────────── */
    document.querySelectorAll('.dropdown > a').forEach(anchor => {
        anchor.setAttribute('aria-haspopup', 'true');
        anchor.setAttribute('aria-expanded', 'false');
        anchor.addEventListener('click', e => {
            if (window.innerWidth > 900) return;
            e.preventDefault();
            const li = anchor.parentElement;
            const opening = !li.classList.contains('open');
            document.querySelectorAll('.dropdown.open').forEach(other => {
                if (other !== li) {
                    other.classList.remove('open');
                    other.querySelector(':scope > a').setAttribute('aria-expanded', 'false');
                    const sub = other.querySelector('.submenu-items');
                    if (sub) sub.style.maxHeight = '0px';
                }
            });
            li.classList.toggle('open', opening);
            anchor.setAttribute('aria-expanded', opening ? 'true' : 'false');
        });
    });

    /* ── Submenu accordion (index.html nested groups) ─────────── */
    document.querySelectorAll('.submenu-group').forEach(group => {
        const btn  = group.querySelector('.submenu-toggle');
        const list = group.querySelector('.submenu-items');
        if (!btn || !list) return;
        list.style.cssText = 'overflow:hidden;max-height:0px;transition:max-height 300ms ease';
        btn.addEventListener('click', e => {
            if (window.innerWidth > 900) return;
            e.preventDefault();
            const isOpen = group.classList.toggle('open');
            btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            list.style.maxHeight = isOpen ? list.scrollHeight + 'px' : '0px';
        });
    });

    /* ── ESC key ──────────────────────────────────────────────── */
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            setNavOpen(false);
            document.querySelectorAll('.dropdown.open').forEach(d => {
                d.classList.remove('open');
                d.querySelector(':scope > a').setAttribute('aria-expanded', 'false');
            });
            document.querySelectorAll('.submenu-group.open').forEach(g => {
                g.classList.remove('open');
                const list = g.querySelector('.submenu-items');
                if (list) list.style.maxHeight = '0px';
            });
        }
    });

    /* ── Resize cleanup ───────────────────────────────────────── */
    let prevWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        if (prevWidth <= 900 && window.innerWidth > 900) {
            setNavOpen(false);
            document.querySelectorAll('.submenu-items').forEach(l => l.style.maxHeight = '0px');
            document.querySelectorAll('.submenu-group, .dropdown').forEach(el => el.classList.remove('open'));
        }
        prevWidth = window.innerWidth;
    });

    /* ── Scroll reveal ────────────────────────────────────────── */
    const revealEls = document.querySelectorAll('.reveal');
    function revealOnScroll() {
        const vh = window.innerHeight;
        revealEls.forEach(el => {
            if (el.getBoundingClientRect().top < vh - 120) el.classList.add('active');
        });
    }
    window.addEventListener('scroll', revealOnScroll, { passive: true });
    revealOnScroll();
})();