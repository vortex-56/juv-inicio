import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { DEFAULT_CMS_CONTENT, type CmsContent, type LeadSubmission } from '../data/cmsDefaults';

interface CmsContextValue {
  cms: CmsContent;
  isLoading: boolean;
  isSaving: boolean;
  leads: LeadSubmission[];
  saveCms: (next: CmsContent) => Promise<boolean>;
  resetCms: () => Promise<boolean>;
  fetchLeads: () => Promise<void>;
  submitLead: (payload: Omit<LeadSubmission, 'id' | 'createdAt'>) => Promise<{ ok: boolean; error?: string }>;
}

const CmsContext = createContext<CmsContextValue | null>(null);

const LOCAL_CMS_KEY = 'juvasa_cms_cache_v5';

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [cms, setCms] = useState<CmsContent>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_CMS_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as Partial<CmsContent>;
        return {
          ...DEFAULT_CMS_CONTENT,
          ...parsed,
          partnerBrands:
            parsed.partnerBrands && parsed.partnerBrands.length > 0
              ? parsed.partnerBrands
              : DEFAULT_CMS_CONTENT.partnerBrands,
        };
      }
    } catch {
      // ignore storage error
    }
    return DEFAULT_CMS_CONTENT;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [leads, setLeads] = useState<LeadSubmission[]>([]);

  useEffect(() => {
    let active = true;
    fetch('/api/cms')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: CmsContent | null) => {
        if (active && data && data.hero) {
          const normalized: CmsContent = {
            ...DEFAULT_CMS_CONTENT,
            ...data,
            partnerBrands:
              data.partnerBrands && data.partnerBrands.length > 0
                ? data.partnerBrands
                : DEFAULT_CMS_CONTENT.partnerBrands,
          };
          setCms(normalized);
          try {
            localStorage.setItem(LOCAL_CMS_KEY, JSON.stringify(normalized));
          } catch {
            // ignore
          }
        }
      })
      .catch(() => {
        // Fallback already initialized with DEFAULT_CMS_CONTENT
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const saveCms = useCallback(async (next: CmsContent): Promise<boolean> => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next),
      });
      if (res.ok) {
        const json = (await res.json()) as { ok: boolean; data: CmsContent };
        setCms(json.data);
        try {
          localStorage.setItem(LOCAL_CMS_KEY, JSON.stringify(json.data));
        } catch {
          // ignore
        }
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      setIsSaving(false);
    }
  }, []);

  const resetCms = useCallback(async (): Promise<boolean> => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/cms/reset', { method: 'POST' });
      if (res.ok) {
        const json = (await res.json()) as { ok: boolean; data: CmsContent };
        setCms(json.data);
        try {
          localStorage.setItem(LOCAL_CMS_KEY, JSON.stringify(json.data));
        } catch {
          // ignore
        }
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      setIsSaving(false);
    }
  }, []);

  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = (await res.json()) as LeadSubmission[];
        setLeads(Array.isArray(data) ? data : []);
      }
    } catch {
      // ignore
    }
  }, []);

  const submitLead = useCallback(
    async (payload: Omit<LeadSubmission, 'id' | 'createdAt'>): Promise<{ ok: boolean; error?: string }> => {
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = (await res.json()) as { ok?: boolean; error?: string; lead?: LeadSubmission };
        if (!res.ok) {
          return { ok: false, error: data.error || 'No se pudo registrar la solicitud.' };
        }
        if (data.lead) {
          setLeads((prev) => [data.lead as LeadSubmission, ...prev]);
        }
        return { ok: true };
      } catch {
        return { ok: false, error: 'Error de conexión al enviar tu solicitud.' };
      }
    },
    []
  );

  return (
    <CmsContext.Provider
      value={{
        cms,
        isLoading,
        isSaving,
        leads,
        saveCms,
        resetCms,
        fetchLeads,
        submitLead,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
}

export function useCms(): CmsContextValue {
  const ctx = useContext(CmsContext);
  if (!ctx) {
    throw new Error('useCms debe usarse dentro de CmsProvider');
  }
  return ctx;
}
