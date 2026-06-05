'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AnonymousReportForm() {
  const [image, setImage] = useState<File | null>(null);
  const [beach, setBeach] = useState<string>('rk_beach');
  const [incidentType, setIncidentType] = useState<string>('rip_current');
  const [severity, setSeverity] = useState<number>(3);
  const [wavePattern, setWavePattern] = useState<string>('');
  const [debrisType, setDebrisType] = useState<string>('');
  const [lat, setLat] = useState<string>('');
  const [lng, setLng] = useState<string>('');
  const [reporterName, setReporterName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [geoLoading, setGeoLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = () => {
    if (!navigator.geolocation) return;
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude.toFixed(6));
        setLng(position.coords.longitude.toFixed(6));
        setGeoLoading(false);
      },
      () => setGeoLoading(false),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert('Please upload an incident image.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData();
    formData.append('image', image);
    formData.append('beach', beach);
    formData.append('incident_type', incidentType);
    formData.append('severity', severity.toString());

    if (wavePattern) formData.append('wave_pattern', wavePattern);
    if (debrisType) formData.append('debris_type', debrisType);
    if (lat) formData.append('lat', lat);
    if (lng) formData.append('lng', lng);
    if (reporterName) formData.append('reporter_name', reporterName);
    if (notes) formData.append('notes', notes);

    try {
      const response = await fetch('/api/sentinel', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Submission failed');
      setSubmitStatus({ success: true, message: 'Incident reported successfully to GVMC Sentinel!' });

      setImage(null);
      setNotes('');
      setReporterName('');
    } catch (err) {
      setSubmitStatus({ success: false, message: 'Failed to stream incident report. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-8 bg-base text-dark font-body flex justify-center items-start">
      <div className="w-full max-w-4xl">
        {/* Navigation & Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Link href="/" className="text-ocean font-semibold text-sm hover:underline mb-2 inline-block">
              &larr; Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-dark">Submit Field Report</h1>
            <p className="text-sm text-gray-500 mt-1">Upload scene evidence. AI Agent 1 will process your submission.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
          {/* Desktop Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* COLUMN 1: PRIMARY REQUIRED DATA */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Capture / Upload Evidence <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 hover:border-ocean transition-colors bg-gray-50">
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-sky/30 file:text-ocean hover:file:bg-sky/50 transition-colors cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Location Sector <span className="text-red-500">*</span>
                </label>
                <select
                  value={beach}
                  onChange={(e) => setBeach(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm transition-all"
                >
                  <option value="rk_beach">RK Beach</option>
                  <option value="yarada">Yarada Beach</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Incident Nature <span className="text-red-500">*</span>
                </label>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                  {['rip_current', 'debris', 'both'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setIncidentType(type)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg capitalize transition-all ${incidentType === type
                          ? 'bg-white text-ocean shadow-sm'
                          : 'text-gray-500 hover:text-dark'
                        }`}
                    >
                      {type.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-dark">
                    Perceived Severity <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs px-2 py-1 rounded-md bg-sand font-bold text-dark">
                    Level {severity}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={severity}
                  onChange={(e) => setSeverity(Number(e.target.value))}
                  className="w-full accent-ocean bg-gray-200 rounded-lg h-2 cursor-pointer"
                />
              </div>
            </div>

            {/* COLUMN 2: OPTIONAL METADATA & GEO */}
            <div className="space-y-6 md:border-l md:border-gray-100 md:pl-8">

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Wave Pattern</label>
                  <select
                    value={wavePattern}
                    onChange={(e) => setWavePattern(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-ocean text-sm"
                  >
                    <option value="">N/A</option>
                    <option value="calm">Calm</option>
                    <option value="moderate">Moderate</option>
                    <option value="dangerous">Dangerous</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Debris Category</label>
                  <select
                    value={debrisType}
                    onChange={(e) => setDebrisType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-ocean text-sm"
                  >
                    <option value="">N/A</option>
                    <option value="plastic">Plastic</option>
                    <option value="organic">Organic</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Geotag Data</label>
                  <button
                    type="button"
                    onClick={fetchLocation}
                    disabled={geoLoading}
                    className="text-xs text-ocean hover:text-ocean/80 font-bold bg-sky/20 px-2 py-1 rounded-md transition-colors"
                  >
                    {geoLoading ? 'Acquiring...' : 'Refresh GPS'}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    step="any"
                    placeholder="Latitude"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:border-ocean"
                  />
                  <input
                    type="number"
                    step="any"
                    placeholder="Longitude"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:border-ocean"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Reporter Name (Optional)</label>
                <input
                  type="text"
                  placeholder="Leave blank to remain anonymous"
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Additional Observations</label>
                <textarea
                  rows={2}
                  placeholder="Provide extra context for GVMC..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm resize-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Submission Action */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto md:min-w-[300px] py-4 px-8 bg-ocean text-white font-bold rounded-xl shadow-md hover:bg-ocean/90 active:scale-[0.98] disabled:opacity-50 transition-all cursor-pointer text-base"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>

            {submitStatus && (
              <div className={`mt-4 p-4 w-full md:w-auto md:min-w-[300px] rounded-xl text-center text-sm font-semibold border ${submitStatus.success ? 'bg-sky/20 border-sky/30 text-ocean' : 'bg-red-50 border-red-100 text-red-600'
                }`}>
                {submitStatus.message}
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}